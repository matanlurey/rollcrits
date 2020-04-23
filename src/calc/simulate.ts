import Prando from 'prando';

import { SimConfig } from '../state/state';

export interface Results {
  netHits: number;
  netCrits: number;
}

export enum AttackDiceSide {
  blank,
  surge,
  hit,
  crit,
}

const diceTable = {
  white: [
    AttackDiceSide.crit,
    AttackDiceSide.surge,
    AttackDiceSide.hit,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
  ],

  black: [
    AttackDiceSide.crit,
    AttackDiceSide.surge,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
    AttackDiceSide.blank,
  ],

  red: [
    AttackDiceSide.crit,
    AttackDiceSide.surge,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.hit,
    AttackDiceSide.blank,
  ],
};

export function simulate(configuration: SimConfig): Results[] {
  const results: Results[] = [];
  const random = new Prando();

  for (let i = 0; i < configuration.iterations; i++) {
    // Aggregate results.
    const rolled: AttackDiceSide[] = [];

    // Roll dice.
    for (let d = 0; d < configuration.attackPool.red; d++) {
      rolled.push(random.nextArrayItem(diceTable.red));
    }
    for (let d = 0; d < configuration.attackPool.black; d++) {
      rolled.push(random.nextArrayItem(diceTable.black));
    }
    for (let d = 0; d < configuration.attackPool.white; d++) {
      rolled.push(random.nextArrayItem(diceTable.white));
    }

    // Determine results.
    let netHits = 0;
    let netCrits = 0;
    for (const roll of rolled) {
      if (roll === AttackDiceSide.crit) {
        netCrits++;
      } else if (roll === AttackDiceSide.hit) {
        netHits++;
      } else if (roll === AttackDiceSide.surge) {
        if (configuration.attackModifiers.surge === 'crit') {
          netCrits++;
        } else if (configuration.attackModifiers.surge === 'hit') {
          netHits++;
        }
      }
    }

    results.push({
      netHits: netHits,
      netCrits: netCrits,
    });
  }

  return results;
}
