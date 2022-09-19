import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import HeaderAvatar from './HeaderAvatar'
import HeaderBadge from './HeaderBadge'

const HeaderTop = ():React.ReactElement => {
    return(
        <div className='flex w-full items-center justify-between px-[1rem]'>
            <div className='flex flex-row items-center justify-center'>
                 <div className='mt-[1.2px]'><AiOutlineBars fontSize='1.5rem' color='#717579'/></div>
                 <div className='text-lg font-medium mx-[20px]'>Market</div>
            </div>
            <div className='flex flex-row items-center justify-center'>
               <HeaderBadge />
               <HeaderAvatar/>
            </div>
        </div>
    )
}

export default HeaderTop