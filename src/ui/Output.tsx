import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import Breakdown from './Output/Breakdown';
import { Simulation } from '../app/simulation';
import { Inputs } from '../app/config';

export default (props: { simulate: Inputs }) => {
  const data = new Simulation(props.simulate).simulate();
  const grouped: { [key: number]: number } = {};
  const ticks = new Set<number>();
  for (const result of data) {
    const hits = result.rawTotalHits;
    grouped[hits] = (grouped[hits] || 0) + 1;
    ticks.add(hits);
  }
  return (
    <>
      <VictoryChart
        animate={{ duration: 1000 }}
        domainPadding={{ x: 25 }}
        height={200}
      >
        <VictoryBar
          data={Object.entries(grouped).map((value) => {
            return { x: value[0], y: value[1] };
          })}
          labels={({ datum }) =>
            `${((datum.y / data.length) * 100).toFixed(0)}%`
          }
          style={{
            data: {
              fill: 'tomato',
            },
          }}
        />
        <VictoryAxis
          style={{
            axisLabel: { padding: 30 },
          }}
        />
      </VictoryChart>
      <Breakdown
        data={data}
        defenders={props.simulate.defenders}
        mods={{
          impact: props.simulate.attackMods.impact,
        }}
        showDefenderDetails={false}
      />
    </>
  );
};
