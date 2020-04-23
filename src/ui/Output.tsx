import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import * as stats from 'simple-statistics';
import Breakdown from './Output/Breakdown';
import { SimConfig } from '../state/state';
import { simulate } from '../calc/simulate';

export default (props: { simulate: SimConfig }) => {
  const data = simulate(props.simulate);
  const grouped: { [key: number]: number } = {};
  const ticks = new Set<number>();
  for (const result of data) {
    const hits = result.netCrits + result.netHits;
    grouped[hits] = (grouped[hits] || 0) + 1;
    ticks.add(hits);
  }
  return (
    <>
      <VictoryChart
        animate={{ duration: 1000 }}
        domainPadding={{ x: 15 }}
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
          label={`μ Hits: ${stats
            .mean(data.map((d) => d.netHits + d.netCrits))
            .toFixed(1)}`}
          style={{
            axisLabel: { padding: 30 },
          }}
        />
      </VictoryChart>
      <Breakdown data={data} />
    </>
  );
};
