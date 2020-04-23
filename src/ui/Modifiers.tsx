import React from 'react';
import { Form, Select } from 'antd';
import { AttackDiceModifiers } from '../state/state';

const { Option } = Select;

export default (props: {
  modifiers: AttackDiceModifiers;
  onChanged: (newModifiers: AttackDiceModifiers) => void;
}) => {
  return (
    <Form layout="inline">
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
    </Form>
  );
};
