import React from 'react';
import { Table } from 'antd';
import * as stats from 'simple-statistics';

// TODO: Make customizable.
const defending = [
  { name: 'B1 Battle Droid', toWound: 5 / 6, armor: false },
  { name: 'B2 Battle Droid', toWound: 5 / 6, armor: 1 },
  { name: 'Rebel Trooper', toWound: 4 / 6, armor: false },
  { name: 'Stormtrooper', toWound: 3 / 6, armor: false },
  { name: 'Deathtrooper', toWound: 2 / 6, armor: false },
  { name: 'Rebel AT-RT', toWound: 5 / 6, armor: true },
  { name: 'X-34 Landpseeder', toWound: 4 / 6, armor: 2 },
  { name: 'T-47 Airspeeder', toWound: 4 / 6, armor: true },
  { name: 'Dewback Rider', toWound: 3 / 6, armor: 1 },
  { name: 'Occupier Tank', toWound: 3 / 6, armor: true },
];

export default (props: {
  data: Array<{
    netHits: number;
    netCrits: number;
  }>;
}) => {
  // Determine average # of hits and crits.
  const avgHits = stats.mean(props.data.map((d) => d.netHits));
  const avgCrits = stats.mean(props.data.map((d) => d.netCrits));

  // Aggregate results per defending unit.
  const results: Array<{
    key: string;
    name: string;
    cover0: string;
    cover1: string;
    cover2: string;
  }> = [];

  for (const defender of defending) {
    let hits = avgHits;
    let crits = avgCrits;

    if (defender.armor) {
      if (defender.armor === true) {
        hits = 0;
      } else {
        hits = Math.max(0, hits - defender.armor);
      }
    }

    const total = hits + crits;
    const cover0 = Math.max(0, total - 0) * defender.toWound;
    const cover1 = Math.max(0, total - 1) * defender.toWound;
    const cover2 = Math.max(0, total - 2) * defender.toWound;

    results.push({
      key: defender.name,
      name: defender.name,
      cover0: cover0.toFixed(1),
      cover1: cover1.toFixed(1),
      cover2: cover2.toFixed(1),
    });
  }

  // Add
  return (
    <Table
      bordered
      columns={[
        { title: 'Defending', key: 'name', dataIndex: 'name' },
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
