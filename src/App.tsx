import React from 'react';
import { Layout } from 'antd';
import './App.scss';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
    </Header>
    <Content style={{ padding: '25px 50px' }}>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer></Footer>
  </Layout>
  );
}

export default App;
