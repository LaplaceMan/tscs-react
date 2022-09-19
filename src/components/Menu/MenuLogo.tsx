import React from 'react'
import logo from '../../assets/logo.svg'
const MenuLogo = ():React.ReactElement => {
    return (
        <div className='flex h-[8vh] mt-[1vh] items-center justify-center'>
            <img src={logo} style={{width: '8vw', minWidth: '110px'}} />
        </div>
    )
}
export default MenuLogo