import React from 'react';
import GitInfo from 'react-git-info/macro';
import { Layout, Card, Form, Button, Row, Col } from 'antd';
import {
  SettingOutlined,
  StarOutlined,
  EditOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

import './App.scss';

import { SimConfig, encodeConfig, decodeConfig } from './state';
import Pool from '../ui/Pool';
import Output from '../ui/Output';
import Modifiers from '../ui/Modifiers';
import IterationSlider from '../ui/IterationSlider';
import Prando from 'prando';
import SeedInput from '../ui/SeedInput';
import { AttackDieSide } from './simulation';
import Tokens from '../ui/Tokens';

const { Sider } = Layout;

class App extends React.Component<{}, SimConfig> {
  public static readonly defaultState: SimConfig = Object.freeze({
    pool: {
      red: 1,
      black: 1,
      white: 1,
    },
    modifiers: {
      critical: 0,
      impact: 0,
      marksman: false,
      pierce: 0,
      precise: 0,
      surge: AttackDieSide.blank,
    },
    tokens: {
      surge: 0,
      aim: 0,
      dodge: 0,
    },
    iterations: 10000,
    rngSeed: `${new Prando().nextString(10)}`,
  });

  private static readonly defaultEncodedState = encodeConfig(App.defaultState);
  private static readonly shortHash = GitInfo().commit.shortHash;

  constructor(props: {}) {
    super(props);
    const state = JSON.parse(JSON.stringify(App.defaultState));
    this.state = { ...state, ...decodeConfig(window.location.hash) };
  }

  encodeStateIfChanged() {
    const encodedState = encodeConfig(this.state);
    if (encodedState === App.defaultEncodedState) {
      window.location.hash = 'default';
    } else {
      window.location.hash = encodedState;
    }
  }

  render() {
    this.encodeStateIfChanged();
    return (
      <Layout style={{ minHeight: '100vh', height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width="250px"
          style={{ minHeight: '100vh', height: '100%' }}
        >
          <div className="logo">
            <strong>RollCrits</strong> #{App.shortHash}
          </div>
          <Card
            title={
              <span>
                <SettingOutlined />
                <span> Settings</span>
              </span>
            }
          >
            <Form layout="vertical">
              <Form.Item label="Iterations">
                <IterationSlider
                  value={this.state.iterations}
                  onChanged={(value) => this.setState({ iterations: value })}
                />
              </Form.Item>
              <Form.Item label="RNG Seed">
                <SeedInput
                  value={this.state.rngSeed}
                  onChanged={(value) => this.setState({ rngSeed: value })}
                />
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Button
                    block
                    disabled={window.location.hash === '#default'}
                    type="danger"
                    onClick={() => {
                      this.setState(App.defaultState);
                    }}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
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
              dice={this.state.pool}
              onChanged={(newDice) => {
                this.setState({
                  pool: newDice,
                });
              }}
            />
          </Card>
          <Card
            title={
              <span>
                <EditOutlined />
                <span> Modifiers</span>
              </span>
            }
          >
            <Modifiers
              modifiers={this.state.modifiers}
              onChanged={(newModifiers) => {
                this.setState({
                  modifiers: newModifiers,
                });
              }}
            />
          </Card>
          <Card
            title={
              <span>
                <AppstoreOutlined />
                <span> Tokens</span>
              </span>
            }
          >
            <Tokens
              tokens={this.state.tokens}
              onChanged={(newTokens) => {
                this.setState({
                  tokens: newTokens,
                });
              }}
            />
          </Card>
        </Sider>
        <Layout>
          <Layout.Content style={{ margin: '24px 16px 0' }}>
            <div className="content-module">
              <Output simulate={this.state} />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
