import Prando from 'prando';
import { AppConfig, AttackDiceModifiers, AttackerTokens } from './state';

/**
 * Sides of an attack die.
 */
export enum AttackDieSide {
  blank = 'blank',
  surge = 'surge',
  hit = 'hit',
  crit = 'crit',
}

/**
 * Sides of a defense die.
 */
export enum DefenseDieSide {
  blank = 'blank',
  surge = 'surge',
  block = 'block',
}

/**
 * Types of an attack die.
 */
export const AttackDieType = {
  white: [
    AttackDieSide.crit,
    AttackDieSide.surge,
    AttackDieSide.hit,
    AttackDieSide.blank,
    AttackDieSide.blank,
    AttackDieSide.blank,
    AttackDieSide.blank,
    AttackDieSide.blank,
  ],
  black: [
    AttackDieSide.crit,
    AttackDieSide.surge,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.blank,
    AttackDieSide.blank,
    AttackDieSide.blank,
  ],
  red: [
    AttackDieSide.crit,
    AttackDieSide.surge,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.hit,
    AttackDieSide.blank,
  ],
};

/**
 * Types of a defense die.
 */
export const DefenseDieType = {
  white: [
    DefenseDieSide.block,
    DefenseDieSide.surge,
    DefenseDieSide.blank,
    DefenseDieSide.blank,
    DefenseDieSide.blank,
    DefenseDieSide.blank,
  ],

  red: [
    DefenseDieSide.block,
    DefenseDieSide.block,
    DefenseDieSide.block,
    DefenseDieSide.surge,
    DefenseDieSide.blank,
    DefenseDieSide.blank,
  ],
};

/**
 * Defines a single attack die.
 */
export class AttackDie {
  static readonly red = new AttackDie(AttackDieType.red, 3);
  static readonly black = new AttackDie(AttackDieType.black, 3);
  static readonly white = new AttackDie(AttackDieType.white, 3);

  private constructor(
    private readonly sides: AttackDieSide[],
    public readonly order: number,
  ) {}

  /**
   * With the provided {rng}, changes the result of the die.
   */
  roll(rng: Prando): AttackDieSide {
    return rng.nextArrayItem(this.sides);
  }
}

/**
 * Defines a single defense die.
 */
export class DefenseDie {
  static readonly red = new DefenseDie(DefenseDieType.red);
  static readonly white = new DefenseDie(DefenseDieType.white);
  static readonly none = new DefenseDie([DefenseDieSide.blank]);

  private constructor(private readonly sides: DefenseDieSide[]) {}

  /**
   * With the provided {rng}, changes the result of the die.
   */
  roll(rng: Prando): DefenseDieSide {
    return rng.nextArrayItem(this.sides);
  }
}

export interface DefenseStats {
  /**
   * Type of defense die
   */
  dice: DefenseDie;

  /**
   * Set if the die surge-side is considered a block.
   */
  surges?: true;

  /**
   * Set if numerical or unlimited armor.
   */
  armor?: number | true;

  /**
   * Set if immune to pierce or impervious to pierce.
   */
  pierce?: 'immune' | 'impervious';
}

export class AttackBranch {
  constructor(
    private readonly rng: Prando,
    private readonly result: Array<{ dice: AttackDie; roll: AttackDieSide }>,
    private readonly modifiers: AttackDiceModifiers,
    private readonly tokens: AttackerTokens,
  ) {}

  private aggregateDice(): { hits: number; crits: number } {
    let hits = 0;
    let crits = 0;
    let critical = this.modifiers.critical;
    let surgeTokens = this.tokens.surge;

    for (const result of this.result) {
      let { roll } = result;

      if (roll === AttackDieSide.surge) {
        if (critical) {
          roll = AttackDieSide.crit;
          critical--;
        } else if (this.modifiers.surge !== 'blank' && surgeTokens) {
          roll = AttackDieSide.hit;
          surgeTokens--;
        } else {
          roll = this.modifiers.surge;
        }
      }

      // TODO: Implement aim tokens.

      switch (roll) {
        case AttackDieSide.crit:
          crits++;
          break;
        case AttackDieSide.hit:
          hits++;
          break;
        case AttackDieSide.blank:
          break;
      }
    }

    return { hits, crits };
  }

  /**
   * Returns the computed number of hits given cover and defense stats.
   */
  hits(cover: number, defender: DefenseStats): DefenseBranch {
    let { hits, crits } = this.aggregateDice();

    // Reduce hits by the amount of static cover, to a minimum of 0.
    hits = Math.max(0, hits - cover);

    // If `armor`, convert hits to crits, and deplete all or some hits.
    if (defender.armor) {
      const convert = Math.min(hits, this.modifiers.impact);
      hits -= convert;
      crits += convert;

      if (defender.armor === true) {
        // All non-converted hits are now cancelled.
        hits = 0;
      } else {
        // Reduce hits by the amount of static armor, to a minimum of 0.
        hits = Math.max(0, hits - defender.armor);
      }
    }

    // Final number of dice that will need to be rolled for wounds.
    // TODO: Consider returning multiple branches per attack.
    return new DefenseBranch(
      this.rng,
      hits + crits,
      defender,
      this.modifiers.pierce,
    );
  }

  get rawTotalHits(): number {
    let { hits, crits } = this.aggregateDice();
    return hits + crits;
  }
}

export class DefenseBranch {
  constructor(
    private readonly rng: Prando,
    public readonly hits: number,
    private readonly stats: DefenseStats,
    private readonly pierce: number,
  ) {}

  /**
   * Given the configuration, generates appropriate defense dice.
   */
  private generateDefenseDice(): DefenseDie[] {
    let hits = this.hits;
    if (this.stats.pierce === 'impervious') {
      hits += this.pierce;
    }
    return Array(hits).fill(this.stats.dice);
  }

  /**
   * Computes the number of wounds based on rolling defensive dice.
   */
  wounds(): number {
    let blocks = 0;

    for (const die of this.generateDefenseDice()) {
      switch (die.roll(this.rng)) {
        case DefenseDieSide.block:
          blocks++;
          break;
        case DefenseDieSide.surge:
          if (this.stats.surges) {
            blocks++;
          }
          break;
        case DefenseDieSide.blank:
          break;
      }
    }

    if (this.pierce && this.stats.pierce !== 'immune') {
      blocks = Math.max(0, blocks - this.pierce);
    }

    // Future-proof against things like danger sense, a minimum of 0 wounds.
    return Math.max(0, this.hits - blocks);
  }
}

/**
 * Manages running the simulation from the top-down (as the root).
 */
export class Simulation {
  private readonly rng: Prando;

  constructor(private readonly config: AppConfig) {
    this.rng = new Prando(config.rngSeed);
  }

  /**
   * Given the configuration, generates appropriate attack dice.
   */
  private generateAttackDice(): AttackDie[] {
    const results: AttackDie[] = [];
    const dicePool = this.config.pool;
    for (let i = 0; i < dicePool.red; i++) {
      results.push(AttackDie.red);
    }
    for (let i = 0; i < dicePool.black; i++) {
      results.push(AttackDie.black);
    }
    for (let i = 0; i < dicePool.white; i++) {
      results.push(AttackDie.white);
    }
    return results;
  }

  private staticSortDice(a: AttackDie, b: AttackDie) {}

  /**
   * Returns possible results of the simulation.
   */
  simulate(): AttackBranch[] {
    const branches: AttackBranch[] = Array(this.config.iterations);
    for (let i = 0; i < branches.length; i++) {
      // Roll dice.
      const results = this.generateAttackDice()
        .map((d) => {
          return {
            dice: d,
            roll: d.roll(this.rng),
          };
        })
        .sort((a, b) => a.dice.order - b.dice.order);

      branches[i] = new AttackBranch(
        this.rng,
        results,
        this.config.modifiers,
        this.config.tokens,
      );
    }
    return branches;
  }
}
