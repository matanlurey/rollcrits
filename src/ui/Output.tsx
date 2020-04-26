import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import Breakdown from './Output/Breakdown';
import { AppConfig } from '../app/state';
import { Simulation } from '../app/simulation';

export default (props: { simulate: AppConfig }) => {
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
        mods={{
          impact: props.simulate.modifiers.impact,
        }}
        showDefenderDetails={props.simulate.settings.showDefenderDetails}
      />
    </>
  );
};
