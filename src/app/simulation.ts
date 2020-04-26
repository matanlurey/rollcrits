import Prando from 'prando';
import { AttackModifiers, AttackTokens, Inputs } from './config';

/**
 * Sides of an attack die.
 */
export type AttackDieSide = 'blank' | 'surge' | 'hit' | 'crit';
/**
 * Sides of a defense die.
 */
export type DefenseDieSide = 'blank' | 'surge' | 'block';

/**
 * Types of an attack die.
 */
export const AttackDieType: { [index: string]: AttackDieSide[] } = {
  white: ['crit', 'surge', 'hit', 'blank', 'blank', 'blank', 'blank', 'blank'],
  black: ['crit', 'surge', 'hit', 'hit', 'hit', 'blank', 'blank', 'blank'],
  red: ['crit', 'surge', 'hit', 'hit', 'hit', 'hit', 'hit', 'blank'],
};

/**
 * Types of a defense die.
 */
export const DefenseDieType: { [index: string]: DefenseDieSide[] } = {
  white: ['block', 'surge', 'blank', 'blank', 'blank', 'blank'],
  red: ['block', 'block', 'block', 'surge', 'blank', 'blank'],
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
   * How many extra dice are rolled.
   */
  extraDice?: number | { [key in 'white' | 'red']: number };

  /**
   * Type of defense die
   */
  dice: DefenseDie;

  /**
   * How many dodge tokens and dodge-related defensive bonuses.
   */
  dodge?:
    | number
    | {
        deflect?: true;
        outmanuever?: true;
        tokens: number;
      };

  /**
   * Number of hits that may be guardian-d away.
   */
  guardian?: number;

  /**
   * Set if the die surge-side is considered a block.
   */
  surges?: true | number;

  /**
   * Number of shield tokens.
   */
  shield?: number;

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
    private readonly modifiers: AttackModifiers,
    private readonly tokens: AttackTokens,
  ) {}

  /**
   * Mutates the provided array applying an "aim".
   */
  private applyAimToken(
    results: Array<{ dice: AttackDie; roll: AttackDieSide }>,
    soFar: { hits: number; crits: number },
    modify: number,
    critical: number,
    surgeTokens: number,
    optimizeFor?: {
      cover: number;
      defender: DefenseStats;
    },
  ): void {
    const rerollDice = (result: { dice: AttackDie; roll: AttackDieSide }) => {
      let roll = result.dice.roll(this.rng);

      // TODO: Share code with aggregateDice.
      if (roll === 'surge') {
        if (critical) {
          roll = 'crit';
          critical--;
        } else if (this.modifiers.surge !== 'blank' && surgeTokens) {
          roll = 'hit';
          surgeTokens--;
        } else {
          roll = this.modifiers.surge;
        }
      }

      result.roll = roll;
      modify--;
    };

    // Assume the results are sorted where it goes RBW. First roll all blanks.
    for (let i = 0; i < results.length; i++) {
      if (!modify) {
        break;
      }
      switch (results[i].roll) {
        // Always re-roll blanks. Conversions already applied.
        case 'blank':
          rerollDice(results[i]);
          break;
      }
    }

    // If we aren't just going for a vanity stat, we might want to roll crits.
    if (optimizeFor) {
      for (let i = 0; i < results.length; i++) {
        if (!modify) {
          break;
        }
        switch (results[i].roll) {
          // Next, re-roll hits, sometimes.
          case 'hit':
            if (this.shouldRerollHit(soFar, optimizeFor)) {
              rerollDice(results[i]);
            }
            break;
        }
      }
    }
  }

  // FYI: If we are entering this function, we have no blanks left.
  private shouldRerollHit(
    soFar: { hits: number; crits: number },
    against: { cover: number; defender: DefenseStats },
  ): boolean {
    // If we have already maxed out our impact against armor, re-roll for crits.
    let willCancel = against.cover;

    if (against.defender.dodge && !this.modifiers.highVelocity) {
      const dodge = against.defender.dodge;
      if (typeof dodge === 'number') {
        willCancel += dodge;
      } else if (!dodge.outmanuever) {
        willCancel += dodge.tokens;
      }
    }

    if (against.defender.guardian) {
      willCancel += against.defender.guardian;
    }

    if (against.defender.armor === true) {
      willCancel += Math.max(0, soFar.hits - this.modifiers.impact);
    }

    // If cover/armor would cancel all our hits, re-roll for crits.
    if (willCancel >= soFar.hits) {
      return true;
    }

    // TODO: This function is far from optimal, and very confusing.
    return false;
  }

  private aggregateDice(optimizeFor?: {
    cover: number;
    defender: DefenseStats;
  }): { hits: number; crits: number } {
    // Make a copy of the results.
    const results = this.result.map((e) => {
      return {
        dice: e.dice,
        roll: e.roll,
      };
    });

    // Count tokens.
    let critical = this.modifiers.critical;
    let surgeTokens = this.tokens.surge;

    // Aggregate total hits and crits at this point.
    let hits = 0;
    let crits = 0;

    // May be called to aggregate the total hits/crits.
    const aggregateHits = () => {
      hits = 0;
      crits = 0;
      for (const result of results) {
        switch (result.roll) {
          case 'crit':
            crits++;
            break;
          case 'hit':
            hits++;
            break;
        }
      }
    };

    // Reverse order, apply surges/critical to our worst dice (white) first.
    for (let i = results.length - 1; i >= 0; i--) {
      const result = results[i];
      let { roll } = result;

      if (roll === 'surge') {
        if (critical) {
          roll = 'crit';
          critical--;
        } else if (this.modifiers.surge !== 'blank' && surgeTokens) {
          roll = 'hit';
          surgeTokens--;
        } else {
          roll = this.modifiers.surge;
        }
      }

      result.roll = roll;
    }

    let aims = this.tokens.aim;
    while (aims) {
      // We'll need to know how many hits/crits so far.
      aggregateHits();
      this.applyAimToken(
        results,
        { hits, crits },
        2 + this.modifiers.precise,
        critical,
        surgeTokens,
        optimizeFor,
      );
      aims--;
    }

    // One final time.
    aggregateHits();
    return { hits, crits };
  }

  /**
   * Returns the computed number of hits given cover and defense stats.
   */
  hits(cover: number, defender: DefenseStats): DefenseBranch {
    let { hits, crits } = this.aggregateDice({
      cover,
      defender,
    });

    // Reduce hits by the amount of static cover, to a minimum of 0.
    hits -= cover;

    // Reduce hits or crits by the amount of dodges, to a minimum of 0.
    let activatedDeflect = false;
    if (defender.dodge && !this.modifiers.highVelocity) {
      const dodge = defender.dodge;
      let tokens: number;
      let cancelCrits: boolean;
      if (typeof dodge === 'number') {
        tokens = dodge;
        cancelCrits = false;
      } else {
        tokens = dodge.tokens;
        cancelCrits = !!dodge.outmanuever;
        if (dodge.deflect) {
          activatedDeflect = true;
        }
      }
      while (tokens) {
        if (crits && cancelCrits) {
          crits--;
        } else {
          hits--;
        }
        tokens--;
      }
    }

    // Reduce hits by guardian.
    hits -= defender.guardian || 0;

    // Ensure neither hits or crits is < 0.
    hits = Math.max(0, hits);
    crits = Math.max(0, crits);

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
    if (activatedDeflect) {
      defender = {
        ...defender,
        surges: true,
      };
    }

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
    const result = Array(hits).fill(this.stats.dice);
    if (this.stats.extraDice) {
      const extraDice = this.stats.extraDice;
      if (typeof extraDice === 'number') {
        return result.concat(Array(extraDice).fill(this.stats.dice));
      } else {
        for (let i = 0; i < extraDice.white; i++) {
          result.push(DefenseDie.white);
        }
        for (let i = 0; i < extraDice.red; i++) {
          result.push(DefenseDie.red);
        }
      }
    }
    return result;
  }

  /**
   * Computes the number of wounds based on rolling defensive dice.
   */
  wounds(): number {
    let blocks = 0;
    let blanks = 0;

    for (const die of this.generateDefenseDice()) {
      switch (die.roll(this.rng)) {
        case 'block':
          blocks++;
          break;
        case 'surge':
          if (this.stats.surges) {
            blocks++;
          } else {
            blanks++;
          }
          break;
        case 'blank':
          blanks++;
          break;
      }
    }

    const vunerableToPierce = this.stats.pierce !== 'immune';
    if (this.pierce && vunerableToPierce) {
      blocks = Math.max(0, blocks - this.pierce);
    }

    if (this.stats.shield && blanks) {
      const shielded = Math.min(this.stats.shield, blanks);
      blocks += shielded;
      blanks -= shielded;
    }

    const wounds = this.hits - blocks;
    return Math.max(0, wounds);
  }
}

/**
 * Manages running the simulation from the top-down (as the root).
 */
export class Simulation {
  private readonly rng: Prando;

  constructor(private readonly inputs: Inputs) {
    this.rng = new Prando(inputs.randomSeed);
  }

  /**
   * Given the configuration, generates appropriate attack dice.
   */
  private generateAttackDice(): AttackDie[] {
    const results: AttackDie[] = [];
    const dicePool = this.inputs.attackPool;
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
    const branches: AttackBranch[] = Array(this.inputs.iterations);
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
        this.inputs.attackMods,
        this.inputs.attackTokens,
      );
    }
    return branches;
  }
}
