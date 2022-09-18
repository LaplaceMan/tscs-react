import { telegram, github, discord, twitter } from "../../assets"
import React from "react"

const ContactIcon = (icon: string, index: number):React.ReactElement => {
    return (
        <div className="m-[8px]" key={index}>
           <img src={icon} width="25rem"/>
        </div>
    )
} 

const MenuFoot = ():React.ReactElement => {
    return (
        <div className="flex flex-col items-center pt-[3.5rem] pb-[0.7rem]">
            <div className="text-[#1D1B23] font-medium">
                Culture Without Boundaries
            </div>
            <div className="text-[#717579]">
                © 2022 All Rights Reserved
            </div>
            <div className="flex flex-row items-center mt-[2rem]">
                {[telegram, github, twitter, discord ].map((item, index) => ContactIcon(item, index))}
            </div>
        </div>
    )
}
export default MenuFoot