import React from 'react';
import { Form, Select, InputNumber } from 'antd';
import { AttackDiceModifiers } from '../app/state';

const { Option } = Select;

export default (props: {
  modifiers: AttackDiceModifiers;
  onChanged: (newModifiers: AttackDiceModifiers) => void;
}) => {
  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 8 },
      }}
    >
      <Form.Item label="Surge">
        <Select
          value={props.modifiers.surge}
          onChange={(value) => {
            props.onChanged({
              ...props.modifiers,
              surge: value,
            });
          }}
        >
          <Option value="none">None</Option>
          <Option value="hit">Hit</Option>
          <Option value="crit">Crit</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Impact">
        <InputNumber
          value={props.modifiers.impact}
          min={0}
          onChange={(value) => {
            props.onChanged({
              ...props.modifiers,
              impact: value === 0 ? 0 : value || props.modifiers.impact,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
