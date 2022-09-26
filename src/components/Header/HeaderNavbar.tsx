import { NavbarItem } from '../../Types/baseTypes'
import { Link } from 'react-router-dom'
import { ReactElement } from 'react'
import HeaderLogItems from './HeaderLog'
const NavbarItems = [{ title: 'Application', link: '/Applications' }, {title: 'Government', link: '/Government'}]

const HeaderNavbarItems = (item: NavbarItem, key: React.Key):ReactElement => {
    return (
        <Link to={item.link} key={key}><li className='mx-4 cursor-pointer text-lg font-medium'>{item.title}</li></Link>
    )
}

const HeaderNavbar = () => {
    return(
        <ul className='md:flex hidden list-none flex-row justify-between items-center flex-initial'>
            {NavbarItems.map((item, index) => (
                HeaderNavbarItems(item, index)
            ))}
            <HeaderLogItems/>
      </ul>
    )
}

export default HeaderNavbar