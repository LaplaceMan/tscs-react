import { telegram, github, discord, twitter } from '../../assets'
import React from 'react'

const ContactIcon = (icon: string, index: number):React.ReactElement => {
    return (
        <div className='m-[8px]' key={index}>
            <img src={icon} width='30vh' style={{minWidth: '24.3px'}} />
        </div>
    )
} 

const MenuFoot = ():React.ReactElement => {
    return (
        <div className='flex flex-col items-center pt-[5vh] pb-[1vh]'>
            <div className='text-[#1D1B23] font-medium text-[2vh] text:min-w-[14px]'>
                Culture Without Boundaries
            </div>
            <div className='text-[#717579] text-[2vh] text:min-w-[14px]'>
                © 2022 All Rights Reserved
            </div>
            <div className='flex flex-row items-center mt-[2vh]'>
                {[telegram, github, twitter, discord ].map((item, index) => ContactIcon(item, index))}
            </div>
        </div>
    )
}
export default MenuFoot