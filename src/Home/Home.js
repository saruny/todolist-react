import React, { Component } from 'react';
import { Layout,Breadcrumb } from 'antd';
import { Card } from 'antd';
const {Content} = Layout;

class Home extends Component {
  render() {
    return (
        <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Card  title="Home">
     
    </Card>   
          
        </div>
      </Content>
 
    );
  }
}

export default Home;
