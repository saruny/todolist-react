import React, { Component } from 'react';
import { Layout } from 'antd';
import './Layout.css';
const {Footer} = Layout;
class FooterLayout extends Component {
    render() {
      return (
        <Footer style={{ textAlign: 'center' }}>
           Design ©2018 Created by Sarun Yuanyong
        </Footer>
      );
    }
  }
  
  export default FooterLayout;