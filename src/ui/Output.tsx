import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup } from 'victory';
import Breakdown from './Output/Breakdown';
import { Simulation, AttackBranch } from '../app/simulation';
import { Inputs } from '../app/config';

export default class extends React.Component<
  { simulate: Inputs },
  {
    simulated: AttackBranch[];
    selected: Array<{
      name: string;
      cover: number;
      wounds: number[];
    }>;
  }
> {
  constructor(props: { simulate: Inputs }) {
    super(props);
    this.state = {
      simulated: new Simulation(this.props.simulate).simulate(),
      selected: [],
    };
  }

  private buildGroup(results: number[]): number[] {
    const grouped: number[] = [];
    for (const wounds of results) {
      const before = grouped[wounds] || 0;
      grouped[wounds] = before + 1;
    }
    return grouped;
  }

  private buildTicks(results: AttackBranch[]): number[] {
    return this.buildGroup(results.map((v) => v.rawTotalHits));
  }

  componentDidUpdate(prevProps: { simulate: Inputs }): void {
    if (prevProps.simulate !== this.props.simulate) {
      this.setState({
        simulated: new Simulation(this.props.simulate).simulate(),
      });
    }
  }

  render() {
    return (
      <>
        <VictoryChart
          animate={{ duration: 2000 }}
          height={200}
          domainPadding={{ x: 25 }}
        >
          <VictoryGroup colorScale={'qualitative'} offset={20}>
            {this.state.selected.length === 0 ? (
              <VictoryBar
                data={this.buildTicks(this.state.simulated).map(
                  (value, index) => {
                    return {
                      x: `${index}`,
                      y: value,
                    };
                  },
                )}
                labels={({ datum }) =>
                  `${((datum.y / this.state.simulated.length) * 100).toFixed(
                    0,
                  )}%`
                }
                style={{
                  data: {
                    fill: 'tomato',
                  },
                }}
                key="Expected Hits"
              />
            ) : (
              <></>
            )}
          </VictoryGroup>
          <VictoryAxis
            label={
              this.state.selected.length
                ? 'Comparing Wounds'
                : 'Aggregate Expected Hits'
            }
            style={{
              axisLabel: { padding: 30 },
            }}
          />
        </VictoryChart>
        <Breakdown
          data={this.state.simulated}
          defenders={this.props.simulate.defenders}
          onSelect={() => {
            // TODO: Implment.
          }}
          mods={{
            impact: this.props.simulate.attackMods.impact,
          }}
        />
      </>
    );
  }
}
