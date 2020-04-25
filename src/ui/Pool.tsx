import React from 'react';
import { Form, InputNumber } from 'antd';
import { AttackDiceConfig } from '../app/state';

function DiceInput(props: {
  label: React.ReactNode;
  count: number;
  onChange: (count: number) => void;
}) {
  return (
    <Form.Item label={props.label}>
      <InputNumber
        value={props.count}
        min={0}
        onChange={(value = 0) => {
          props.onChange(Number.isInteger(value) ? value : props.count);
        }}
      ></InputNumber>
    </Form.Item>
  );
}

export default class Pool extends React.Component<PoolProps> {
  render() {
    const dice = this.props.dice;
    return (
      <Form
        labelCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
      >
        <DiceInput
          label="Red"
          count={dice.red}
          onChange={(v: number) => this.updateDice({ red: v })}
        />
        <DiceInput
          label="Black"
          count={dice.black}
          onChange={(v: number) => this.updateDice({ black: v })}
        />
        <DiceInput
          label="White"
          count={dice.white}
          onChange={(v: number) => this.updateDice({ white: v })}
        />
      </Form>
    );
  }

  updateDice(newPool: Partial<AttackDiceConfig>) {
    this.props.onChanged({ ...this.props.dice, ...newPool });
  }
}

export interface PoolProps {
  readonly dice: AttackDiceConfig;
  readonly onChanged: (pool: AttackDiceConfig) => void;
}
