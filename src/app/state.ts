import Prando from 'prando';
import { AttackDieSide } from './simulation';

export let sessionRngSeed = new Prando().nextString(10);

/**
 * Simulation-wide state (or configuration).
 */
export interface SimConfig {
  /**
   * Attacking dice pool.
   */
  pool: AttackDiceConfig;

  /**
   * Attacking dice pool modifiers.
   */
  modifiers: AttackDiceModifiers;

  /**
   * Number of times the dice should be rolled.
   */
  iterations: number;

  /**
   * Random seed used for simulations.
   */
  rngSeed: string;

  /**
   * Tokens available to spend.
   */
  tokens: AttackerTokens;
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
    if (urlState && urlState.length && urlState !== 'default') {
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
   * How much critical the dice pool has.
   */
  critical: number;

  /**
   * How much impact the dice pool has.
   */
  impact: number;

  /**
   * Whether the pool has marksman.
   */
  marksman: boolean;

  /**
   * How much pierce the dice pool has.
   */
  pierce: number;

  /**
   * How many additional dice may be re-rolled during an aim.
   */
  precise: number;

  /**
   * What the `surge` icon the dice should convert to.
   */
  surge: AttackDieSide.blank | AttackDieSide.hit | AttackDieSide.crit;
}

export interface AttackerTokens {
  /**
   * Aim tokens available.
   */
  aim: number;

  /**
   * Dodge tokens available.
   */
  dodge: number;

  /**
   * Surge tokens available.
   */
  surge: number;
}
