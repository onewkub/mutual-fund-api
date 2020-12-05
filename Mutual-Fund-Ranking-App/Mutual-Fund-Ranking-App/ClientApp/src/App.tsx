import React from 'react';
import './App.scss';
import Router from 'router'
import { Layout } from 'antd'
import MenuBar from 'components/menu-bar'
import SideNavigation from 'components/side-navigation'
import 'antd/dist/antd.css';

const { Header, Footer, Content, Sider } = Layout

function App() {
  return (
    <Layout>

      <Header>
        <MenuBar />
      </Header>

      <Layout>
        <Sider>
          <SideNavigation />
        </Sider>
        <Content>
          <Router></Router>
        </Content>
      </Layout>

      <Footer>
        <div>
          Copyright By Wachira Norasing
        </div>
      </Footer>


    </Layout>
  );
}

export default App;
