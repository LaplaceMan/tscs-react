import { Menu } from 'antd'
import MenuItems from './MenuItems'
import MenuLogo from './MenuLogo'
import MenuFoot from './MenuFoot'
import React from 'react'

const MenuSider = ():React.ReactElement => {
  return (
    <div className='flex flex-col h-full'>
      <MenuLogo />
      <div className='flex flex-col h-full justify-between'>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={['Dashboard']}
        items={MenuItems}
      />
      <MenuFoot />
      </div>
    </div>
  )
}

export default MenuSider