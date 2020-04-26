import React from 'react';
import { Form, Select, InputNumber, Divider } from 'antd';
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
        sm: { span: 12 },
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
      <Divider />
      <Form.Item label="Critical">
        <InputNumber
          value={props.modifiers.critical}
          min={0}
          onChange={(value) => {
            props.onChanged({
              ...props.modifiers,
              critical: value === 0 ? 0 : value || props.modifiers.critical,
            });
          }}
        />
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
      {/*
        TODO: Enable.

        <Form.Item label="Marksman">
          <Switch
            checked={props.modifiers.marksman}
            onChange={(value) => {
              props.onChanged({
                ...props.modifiers,
                marksman: value,
              });
            }}
          />
        </Form.Item>
      */}
      <Form.Item label="Pierce">
        <InputNumber
          value={props.modifiers.pierce}
          min={0}
          onChange={(value) => {
            props.onChanged({
              ...props.modifiers,
              pierce: value === 0 ? 0 : value || props.modifiers.pierce,
            });
          }}
        />
      </Form.Item>
      {/*
        TODO: Enable aim tokens.

        <Form.Item label="Precise">
          <InputNumber
            value={props.modifiers.precise}
            min={0}
            onChange={(value) => {
              props.onChanged({
                ...props.modifiers,
                precise: value === 0 ? 0 : value || props.modifiers.precise,
              });
            }}
          />
        </Form.Item>
      */}
    </Form>
  );
};
