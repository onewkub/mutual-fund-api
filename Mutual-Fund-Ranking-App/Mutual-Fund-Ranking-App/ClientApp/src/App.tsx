import React from 'react'
import Router from 'router'
import { Layout } from 'antd'
import MenuBar from 'components/menu-bar'
import WebFooter from 'components/web-footer'
import SideNavigation from 'components/side-navigation'

import './App.less'

const { Content } = Layout

function App() {
  return (
    <Layout className="app">
      <SideNavigation />
      <Layout>
        <MenuBar />

        <Content className="app-content">
          <Layout className="app-content-layout">
            <Router></Router>
          </Layout>
        </Content>

        <WebFooter />
      </Layout>
    </Layout>
  )
}

export default App
