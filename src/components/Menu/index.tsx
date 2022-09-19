import { Menu } from 'antd'
import MenuItems from './MenuItems'
import MenuLogo from './MenuLogo'
import MenuFoot from './MenuFoot'
import React from 'react'

const MenuSider = ():React.ReactElement => {
  return (
    <div>
      <MenuLogo />
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={['Dashboard']}
        items={MenuItems}
      />
      <MenuFoot />
    </div>
  )
}

export default MenuSider