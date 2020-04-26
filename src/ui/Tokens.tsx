import React from 'react';
import { Form, InputNumber } from 'antd';
import { AttackTokens } from '../app/config';

export default (props: {
  tokens: AttackTokens;
  onChanged: (newModifiers: AttackTokens) => void;
}) => {
  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 12 },
      }}
    >
      <Form.Item label="Aim">
        <InputNumber
          value={props.tokens.aim}
          min={0}
          onChange={(value) => {
            props.onChanged({
              ...props.tokens,
              aim: value === 0 ? 0 : value || props.tokens.aim,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Surge">
        <InputNumber
          value={props.tokens.surge}
          min={0}
          onChange={(value) => {
            props.onChanged({
              ...props.tokens,
              surge: value === 0 ? 0 : value || props.tokens.surge,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
