// Simulation-wide configuraton (state).

import * as _ from 'lodash';
import Prando from 'prando';

export class Config {
  private static readonly defaultInputs = Object.freeze({
    attackMods: Object.freeze({
      critical: 0,
      impact: 0,
      pierce: 0,
      precise: 0,
      surge: 'blank',
    }),
    attackPool: Object.freeze({
      red: 1,
      black: 1,
      white: 1,
    }),
    attackTokens: Object.freeze({
      aim: 0,
      surge: 0,
    }),
    iterations: 10000,
    randomSeed: new Prando().nextString(10),
  }) as Inputs;

  static fromUrl(onChanged: (config: Config) => void): Config {
    const path = window.location.pathname.split('/').splice(1);
    const pool: DicePool = {
      red: 0,
      black: 0,
      white: 0,
    };
    if (path[0] && path[0] !== 'none') {
      for (const match of Array.from(path[0].matchAll(/\d*[rbw]/g))) {
        const check = match[0];
        const color = check[check.length - 1];
        const number = check.substring(0, check.length - 1);
        const amount = Number.parseInt(number) || 0;
        switch (color) {
          case 'r':
            pool.red = amount;
            break;
          case 'b':
            pool.black = amount;
            break;
          case 'w':
            pool.white = amount;
            break;
        }
      }
    }
    const mods = _.cloneDeep(Config.defaultInputs.attackMods);
    if (path[1]) {
      path[1]
        .split(',')
        .map((mod) => mod.split(':'))
        .forEach((pair) => {
          (mods as any)[pair[0]] = (mods as any)[pair[1]];
        });
    }
    const tokens = _.cloneDeep(Config.defaultInputs.attackTokens) as any;
    if (path[2]) {
      path[2]
        .split(',')
        .map((mod) => mod.split(':'))
        .forEach((pair) => {
          tokens[pair[0]] = tokens[pair[1]];
        });
    }
    const search = window.location.search;
    const globals = {
      iterations: 1000,
      randomSeed: Config.defaultInputs.randomSeed,
    } as any;
    search
      .split('&')
      .map((v) => v.split('='))
      .forEach((pair) => {
        globals[pair[0]] = pair[1];
      });
    return new Config(onChanged, {
      attackMods: mods,
      attackPool: pool,
      attackTokens: tokens,
      ...globals,
    });
  }

  constructor(
    private readonly onChanged: (config: Config) => void,
    private mInputs: Inputs = Config.defaultInputs,
  ) {}

  /**
   * Returns the configuration stored as a URL path.
   */
  encodeAsUrl(): string {
    // 'attack-pool'/'attack-mods'/'attack-tokens'?iterations=X&randomSeed=X
    return (
      [
        // attack-pool
        this.encodeAttackPool(),
        // attack-mods
        this.encodeAttackMods(),
        // attack-tokens
        this.encodeTokens(),
      ].join('/') +
      '?' +
      [
        `iterations=${this.mInputs.iterations}`,
        `randomSeed=${this.mInputs.randomSeed}`,
      ].join('&')
    );
  }

  private encodeAttackPool(): string {
    const out: string[] = [];
    const dice = this.mInputs.attackPool;
    if (dice.red) {
      out.push(`${dice.red}r`);
    }
    if (dice.black) {
      out.push(`${dice.black}b`);
    }
    if (dice.white) {
      out.push(`${dice.white}w`);
    }
    if (out.length === 0) {
      return 'none';
    } else {
      return out.join('');
    }
  }

  private encodeGenericBag(bag: { [index: string]: any }): string {
    const out: string[] = [];
    _.forOwn(bag, (v: any, k: string) => {
      if (v) {
        out.push(`${k}:${v}`);
      }
    });
    return out.join(',');
  }

  private encodeAttackMods(): string {
    return this.encodeGenericBag(this.mInputs.attackMods);
  }

  private encodeTokens(): string {
    return this.encodeGenericBag(this.mInputs.attackTokens);
  }

  /**
   * A copy of the inputs to the simulation.
   */
  get inputs(): Inputs {
    return _.cloneDeep(this.mInputs);
  }

  /**
   * Notifies the listening component to update.
   */
  updateInputs(updater: (mutate: Inputs) => void) {
    const mutateState = this.inputs;
    updater(mutateState);
    const newInstance = new Config(this.onChanged, mutateState);
    this.onChanged(newInstance);
  }

  /**
   * Resets back to the original state.
   *
   * TODO: Should this reset back to the original URL state?
   */
  reset(): void {
    const newInstance = new Config(this.onChanged);
    this.onChanged(newInstance);
  }
}

export interface Inputs {
  /**
   * Keywords or abilities that augment the dice pool.
   */
  attackMods: AttackModifiers;

  /**
   * Dice being rolled.
   */
  attackPool: DicePool;

  /**
   * Tokens that may be spent by the attacker.
   */
  attackTokens: AttackTokens;

  /**
   * The number of times to roll each attack (per defender/cover, etc).
   */
  iterations: number;

  /**
   * The RNG seed used for rolling dice.
   */
  randomSeed: string;
}

export interface DicePool {
  red: number;
  black: number;
  white: number;
}

export interface AttackModifiers {
  /**
   * Converts up to X {@link AttackDieSide.surge} to {@link AttackDieSide.crit}.
   */
  critical: number;

  /**
   * Allows penetrating/ignoring the "armor" keyword.
   *
   * When a defender has "armor", converts up to X {@link AttackDieSide.hit} to
   * {@link AttackDieSide.crit} after the "apply-dodge-and-cover" phase (but
   * before armor would cancel the hits).
   */
  impact: number;

  /**
   * Cancels up to {@link DefenseDieSide.block}s.
   */
  pierce: number;

  /**
   * When spending an aim token, you may re-roll up to X additional dice.
   */
  precise: number;

  /**
   * If {@link AttackDieSide.surge}, what the die side should be converted to.
   */
  surge: 'blank' | 'hit' | 'crit';
}

export interface AttackTokens {
  /**
   * May spend a token to re-roll up to 2+{@link AttackModifiers.precise} dice.
   */
  aim: number;

  /**
   * Spend to convert {@link AttackDieSide.surge} to {@link AttackDieSide.hit}.
   */
  surge: number;
}
