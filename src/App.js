import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less' 
import { Layout } from 'antd';
import Home from './Home/Home';
import Todolist from './Todolist/Todolist';

import Menu from './Layout/MenuLayout';
import Footer from './Layout/FooterLayout';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

const {Content} = Layout;
const routes = [
  {
    path: "/Home",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/Todolist",
    exact: false,
    main: () => <Todolist />
  },

];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Layout className="layout">
       <Menu></Menu>
       <Content style={{ margin: '0 16px' }}>
                <div className='row'>
                  <div className="col-sm-12 col-md-12 col-lg-12" style={{ padding: 5 }}>
                  <Switch>

                    {routes.map((route, index) => (
                      <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                      />
                      ))}
                  </Switch>
                  </div>
                </div>

       </Content>
       <Footer></Footer>
      </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
