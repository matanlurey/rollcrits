import React from 'react';
import { SettingFilled } from '@ant-design/icons';
import { Button, Modal, Form, Switch } from 'antd';
import { AppSettings } from '../app/state';

interface SettingsProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

interface SettingsState {
  showDefenderDetails: boolean;
  showModel: boolean;
}

export default class extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
    this.state = {
      showDefenderDetails: props.settings.showDefenderDetails,
      showModel: false,
    };
  }

  render() {
    return (
      <>
        <Button
          icon={<SettingFilled />}
          ghost
          size="small"
          title="Settings"
          onClick={() => this.setState({ showModel: true })}
        ></Button>
        <Modal
          visible={this.state.showModel}
          onOk={() => {
            this.setState({ showModel: false });
            this.props.onChange({
              showDefenderDetails: this.state.showDefenderDetails,
            });
          }}
          onCancel={() =>
            this.setState({
              showModel: false,
              showDefenderDetails: this.props.settings.showDefenderDetails,
            })
          }
          okText="Save"
        >
          <Form>
            <Form.Item label="Show defender details">
              <Switch
                checked={this.state.showDefenderDetails}
                onChange={(value) => {
                  this.setState({
                    showDefenderDetails: value,
                  });
                }}
              ></Switch>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
