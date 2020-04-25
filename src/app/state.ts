import Prando from 'prando';

export let sessionRngSeed = new Prando().nextString(10);

/**
 * Simulation-wide state (or configuration).
 */
export interface SimConfig {
  /**
   * Attacking dice pool.
   */
  attackPool: AttackDiceConfig;

  /**
   * Attacking dice pool modifiers.
   */
  attackModifiers: AttackDiceModifiers;

  /**
   * Number of times the dice should be rolled.
   */
  iterations: number;

  /**
   * Random seed used for simulations.
   */
  rngSeed: string;
}

/**
 * Encodes the provided configuration as base-64 encoded string.
 *
 * @param config
 */
export function encodeConfig(config: SimConfig): string {
  return btoa(JSON.stringify(config));
}

/**
 * Decodes the provided hash-fragment URL into a config.
 *
 * Returns {undefined} if there was no stored configuration.
 */
export function decodeConfig(fragment: string): SimConfig | undefined {
  let urlState = window.location.hash;
  if (urlState) {
    const fragment = urlState.indexOf('#');
    if (fragment !== -1) {
      urlState = urlState.substring(fragment + 1);
    }
    if (urlState && urlState.length) {
      return JSON.parse(atob(urlState));
    }
  }
  return undefined;
}

export interface AttackDiceConfig {
  /**
   * Number of red dice.
   */
  red: number;

  /**
   * Number of black dice.
   */
  black: number;

  /**
   * Number of white dice.
   */
  white: number;
}

export interface AttackDiceModifiers {
  /**
   * What the `surge` icon the dice should convert to.
   */
  surge: 'none' | 'hit' | 'crit';

  /**
   * How much impact the dice pool has.
   */
  impact: number;
}
