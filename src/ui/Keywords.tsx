import React from 'react';
import { Form, InputNumber } from 'antd';

export default () => {
  return (
    <Form layout="inline">
      <Form.Item label="Pierce">
        <InputNumber defaultValue={0}></InputNumber>
      </Form.Item>
    </Form>
  );
};
