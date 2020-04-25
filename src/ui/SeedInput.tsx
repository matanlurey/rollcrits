import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import Prando from 'prando';

export default function (props: {
  value: string;
  onChanged: (value: string) => void;
}) {
  return (
    <Row>
      <Col span={18}>
        <Input
          value={props.value}
          maxLength={10}
          onChange={(v) => props.onChanged(v.target.value)}
        />
      </Col>
      <Col span={2} offset={2}>
        <Button
          icon={<SyncOutlined />}
          title="Randomize"
          onClick={() => props.onChanged(new Prando().nextString(10))}
        />
      </Col>
    </Row>
  );
}
