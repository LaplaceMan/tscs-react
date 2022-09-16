import {
  MdOutlineDashboard,
  MdOutlineShopTwo,
  MdOutlineAssignment,
  MdOutlineUploadFile,
  MdOutlineGroup,
  MdOutlineHome,
  MdOutlineAttachMoney,
  MdOutlineAddBusiness
} from 'react-icons/md';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuItems: MenuItem[] = [
  getItem('Services', 'g1', null, [
    getItem('Dashboard', 'm1', <MdOutlineDashboard />),
    getItem('Market', 'm2', <MdOutlineShopTwo />),
    getItem('Submit Application', 'm3', <MdOutlineAssignment />),
    getItem('Upload Subtitles', 'm4', <MdOutlineUploadFile />),
    getItem('Government', 'm5', <MdOutlineGroup />),
  ], 'group'),

  getItem('Others', 'g2', null, [
    getItem('Personal Center', 'm6', <MdOutlineHome />),
    getItem('Assets', 'm7', <MdOutlineAttachMoney />),
    getItem('Join Us', 'm8', <MdOutlineAddBusiness />),
  ], 'group'),
];

export default MenuItems;