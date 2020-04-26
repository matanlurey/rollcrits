import React from 'react';
import GitInfo from 'react-git-info/macro';
import { Layout, Card, Form, Button, Row, Col } from 'antd';
import {
  StarOutlined,
  EditOutlined,
  AppstoreOutlined,
  SlidersOutlined,
} from '@ant-design/icons';

import './App.scss';

import Pool from '../ui/Pool';
import Output from '../ui/Output';
import Modifiers from '../ui/Modifiers';
import IterationSlider from '../ui/IterationSlider';
import SeedInput from '../ui/SeedInput';
import Tokens from '../ui/Tokens';
import { Config } from './config';

const { Sider } = Layout;

class App extends React.Component<{}, { config: Config }> {
  private static readonly defaultConfigEncoded = new Config(
    (_) => {},
  ).encodeAsUrl();
  private static readonly shortHash = GitInfo().commit.shortHash;

  constructor(props: {}) {
    super(props);
    this.state = {
      config: Config.fromUrl((c) => {
        this.setState({ config: c });
      }),
    };
    window.addEventListener('popstate', (e) => {
      this.setState({
        config: Config.fromUrl((c) => {
          this.setState({ config: c });
        }),
      });
      return false;
    });
  }

  private get allowResetState(): boolean {
    const encodedState = this.state.config.encodeAsUrl();
    return encodedState !== App.defaultConfigEncoded;
  }

  private encodeStateIfChanged() {
    const encodedState = this.state.config.encodeAsUrl();
    const currentState = `${window.location.pathname}${window.location.search}`;
    if (encodedState !== currentState) {
      window.history.pushState({}, '', `/${encodedState}`);
    }
  }

  render() {
    this.encodeStateIfChanged();
    const config = this.state.config;
    const inputs = config.inputs;
    const setInputs = config.updateInputs.bind(this.state.config);
    return (
      <Layout style={{ minHeight: '100vh', height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width="250px"
          style={{ minHeight: '100vh', height: '100%' }}
        >
          <div className="logo">
            <Row>
              <Col span={10}>
                <strong>RollCrits</strong>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                #{App.shortHash}
              </Col>
            </Row>
          </div>
          <Card
            title={
              <span>
                <SlidersOutlined />
                <span> Simulation</span>
              </span>
            }
          >
            <Form layout="vertical">
              <Form.Item label="Iterations">
                <IterationSlider
                  value={inputs.iterations}
                  onChanged={(v) => setInputs((i) => (i.iterations = v))}
                />
              </Form.Item>
              <Form.Item label="RNG Seed">
                <SeedInput
                  value={inputs.randomSeed}
                  onChanged={(v) => setInputs((i) => (i.randomSeed = v))}
                />
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Button
                    block
                    disabled={!this.allowResetState}
                    type="danger"
                    onClick={() => {
                      config.reset();
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
              dice={inputs.attackPool}
              onChanged={(v) => setInputs((i) => (i.attackPool = v))}
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
              modifiers={inputs.attackMods}
              onChanged={(v) => setInputs((i) => (i.attackMods = v))}
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
              tokens={inputs.attackTokens}
              onChanged={(v) => setInputs((i) => (i.attackTokens = v))}
            />
          </Card>
        </Sider>
        <Layout>
          <Layout.Content style={{ margin: '24px 16px 0' }}>
            <div className="content-module">
              <Output simulate={inputs} />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
