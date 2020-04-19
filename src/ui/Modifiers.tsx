import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export default () => {
  return (
    <Form layout="inline">
      <Form.Item label="Surge">
        <Select defaultValue="none">
          <Option value="none">None</Option>
          <Option value="hit">Hit</Option>
          <Option value="crit">Crit</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
