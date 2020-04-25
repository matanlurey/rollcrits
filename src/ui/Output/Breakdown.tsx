import React from 'react';
import { Table } from 'antd';
import * as stats from 'simple-statistics';
import { AttackBranch, DefenseDie, DefenseStats } from '../../app/simulation';

interface Defender extends DefenseStats {
  name: string;
}

// TODO: Make customizable.
const defending: Defender[] = [
  { name: 'B1 Battle Droid', dice: DefenseDie.white() },
  { name: 'B2 Battle Droid', dice: DefenseDie.white(), armor: 1 },
  { name: 'Rebel Trooper', dice: DefenseDie.white(), surges: true },
  { name: 'Stormtrooper', dice: DefenseDie.red() },
  { name: 'Deathtrooper', dice: DefenseDie.red(), surges: true },
  { name: 'Rebel AT-RT', dice: DefenseDie.white(), armor: true },
  {
    name: 'X-34 Landpseeder',
    dice: DefenseDie.white(),
    surges: true,
    armor: 2,
  },
  { name: 'AT-ST', dice: DefenseDie.white(), surges: true, armor: true },
  { name: 'Dewback Rider', dice: DefenseDie.red(), armor: 1 },
  { name: 'Occupier Tank', dice: DefenseDie.red(), armor: true },
];

export default (props: {
  mods: {
    impact: number;
  };
  data: AttackBranch[];
}) => {
  // Aggregate results per defending unit.
  const results: Array<{
    key: string;
    cover0: string;
    cover1: string;
    cover2: string;
  }> = [];

  for (const defender of defending) {
    let woundsByCoverAmount: number[][] = [[], [], []];

    // For each amount of cover.
    for (let cover = 0; cover < woundsByCoverAmount.length; cover++) {
      // For each attacking dice pool.
      for (const branch of props.data) {
        // Add the number of expected wounds (v cover + defender).
        woundsByCoverAmount[cover].push(branch.hits(cover, defender).wounds());
      }
    }

    const expectedWounds = woundsByCoverAmount.map((w) =>
      stats.mean(w).toFixed(2),
    );

    results.push({
      key: defender.name,
      cover0: expectedWounds[0],
      cover1: expectedWounds[1],
      cover2: expectedWounds[2],
    });
  }

  // Add
  return (
    <Table
      bordered
      columns={[
        { title: 'Defending', key: 'nakeyme', dataIndex: 'key' },
        { title: 'No Cover', key: 'cover0', dataIndex: 'cover0' },
        { title: 'Cover 1', key: 'cover1', dataIndex: 'cover1' },
        { title: 'Cover 2', key: 'cover2', dataIndex: 'cover2' },
      ]}
      dataSource={results}
      pagination={false}
      size={'small'}
    ></Table>
  );
};
