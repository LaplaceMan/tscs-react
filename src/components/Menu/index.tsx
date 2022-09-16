import { Menu } from 'antd';
import React from 'react';
import MenuItems from "./MenuItems";
import MenuLogo from "./MenuLogo";
import MenuFoot from "./MenuFoot";

const MenuSider: React.FC = () => {
  return (
    <div>
      <MenuLogo />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={MenuItems}
      />
      <MenuFoot />
    </div>
  );
};

export default MenuSider;