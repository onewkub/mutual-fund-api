import React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, HeartOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { Item } = Menu
function SideNavigation() {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)

  const handleOnCollapse = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <Sider
      className="app-side-nav"
      collapsible
      collapsedWidth={60}
      collapsed={collapsed}
      onCollapse={handleOnCollapse}
    >
      <div className="app-side-nav-title">Logo</div>
      <Menu className="nav-menu">
        <Item className="nav-menu-item" key="1" icon={<UserOutlined />}>
          Menu1
        </Item>
        <Item className="nav-menu-item" key="2" icon={<HeartOutlined />}>
          Menu2
        </Item>
      </Menu>
    </Sider>
  )
}

export default SideNavigation
