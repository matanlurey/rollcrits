import React from "react";
import { Collapse, Col, Form, InputNumber, Layout, Row } from "antd";
import Keywords from "./ui/Keywords";
import Modifiers from "./ui/Modifiers";
import Output from "./ui/Output";
import Pool, { DicePool } from "./ui/Pool";
import "./App.scss";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dice: {
        red: 1,
        black: 1,
        white: 1,
      },
      iterations: 10000,
    };
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">RollCrits 0.2-dev</div>
        </Header>
        <Content className="site-content" style={{ padding: "25px 50px" }}>
          <Row>
            <Col className="content-module" span={12}>
              <Collapse defaultActiveKey={[1, 2, 3, 4]}>
                <Panel header="Settings" key="1">
                  <Form layout="inline">
                    <Form.Item label="Iterations">
                      <InputNumber
                        value={this.state.iterations}
                        onChange={(v = 0) => this.setState({ iterations: v })}
                      ></InputNumber>
                    </Form.Item>
                  </Form>
                </Panel>
                <Panel header="Dice Pool" key="2">
                  <Pool
                    dice={this.state.dice}
                    onChanged={(dice) => {
                      this.setState({
                        dice: dice,
                      });
                    }}
                  />
                </Panel>
              </Collapse>
            </Col>
            <Col className="content-module" span={12}>
              <Output
                dice={this.state.dice}
                iterations={this.state.iterations}
              />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

interface AppState {
  dice: DicePool;
  iterations: number;
}

export default App;
