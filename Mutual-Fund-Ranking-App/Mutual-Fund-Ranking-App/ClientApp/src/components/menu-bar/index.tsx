import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout

function MenuBar() {
  return (
    <Header className="app-header">
      <h2 className="app-header-title">app title</h2>
    </Header>
  )
}

export default MenuBar
