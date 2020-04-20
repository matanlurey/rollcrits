import React from 'react';
import GitInfo from 'react-git-info/macro';
import { Layout, Card, Slider } from 'antd';
import './App.scss';
import { SimConfig, encodeConfig, decodeConfig } from './state/State';
import { SettingOutlined, StarOutlined } from '@ant-design/icons';
import Pool from './ui/Pool';
import Output from './ui/Output';

const { Sider } = Layout;

class App extends React.Component<{}, SimConfig> {
  private static readonly defaultState: SimConfig = {
    attackPool: {
      red: 1,
      black: 1,
      white: 1,
    },
    iterations: 10000,
  };

  private static readonly defaultEncodedState = encodeConfig(App.defaultState);
  private static readonly shortHash = GitInfo().commit.shortHash;

  constructor(props: {}) {
    super(props);
    this.state =
      decodeConfig(window.location.hash) ||
      JSON.parse(JSON.stringify(App.defaultState));
  }

  encodeStateIfChanged() {
    const encodedState = encodeConfig(this.state);
    if (encodedState === App.defaultEncodedState) {
      window.location.hash = '';
    } else {
      window.location.hash = encodedState;
    }
  }

  private iterationsToSlider(iterations: number): number {
    return iterations.toString().length - 1;
  }

  private slideToIterations(slider: number): number {
    switch (slider) {
      case 1:
        return 10;
      case 2:
        return 100;
      case 3:
        return 1000;
      case 4:
        return 10000;
      case 5:
        return 100000;
      default:
        return App.defaultState.iterations;
    }
  }

  render() {
    this.encodeStateIfChanged();
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" width="250px">
          <div className="logo">RollCrits</div>
          <Card
            title={
              <span>
                <SettingOutlined />
                <span> Settings</span>
              </span>
            }
          >
            Iterations
            <Slider
              min={1}
              max={5}
              marks={{
                1: '10',
                3: '1000',
                5: '100000',
              }}
              value={this.iterationsToSlider(this.state.iterations)}
              tipFormatter={this.slideToIterations.bind(this)}
              onChange={(value) =>
                this.setState({
                  iterations: this.slideToIterations(value as number),
                })
              }
            ></Slider>
          </Card>
          <Card
            title={
              <span>
                <StarOutlined />
                <span> Dice</span>
              </span>
            }
          >
            <Pool
              dice={this.state.attackPool}
              onChanged={(newDice) => {
                this.setState({
                  attackPool: newDice,
                });
              }}
            />
          </Card>
        </Sider>
        <Layout>
          <Layout.Content style={{ margin: '24px 16px 0' }}>
            <div className="content-module">
              <Output
                dice={this.state.attackPool}
                iterations={this.state.iterations}
              />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
