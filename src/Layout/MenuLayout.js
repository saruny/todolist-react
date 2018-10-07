import React, { Component } from 'react';
import { Layout,Menu } from 'antd';
import './Layout.css';
import {  Link } from 'react-router-dom';


const {Header} = Layout;
class MenuLayout extends Component {
    render() {
      return (
     
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"> <Link  to="/Home">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/Todolist">ToDoList</Link></Menu.Item>
          </Menu>
        </Header>
      );
    }
  }
  
  export default MenuLayout;