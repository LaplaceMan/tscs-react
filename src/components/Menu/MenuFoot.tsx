import { telegram, github, discord, twitter } from "../../assets"
import React from "react"

const ContactIcon = (icon: string):React.ReactNode => {
    return (
        <div className="m-[8px]">
           <img src={icon} width="25px"/>
        </div>
    );
} 

const MenuFoot = () => {
    return (
        <div className="flex flex-col items-center pt-[50px] pb-[10px]">
            <div className="text-[#1D1B23] font-medium">
                Culture Without Boundaries
            </div>
            <div className="text-[#717579]">
                © 2022 All Rights Reserved
            </div>
            <div className="flex flex-row items-center mt-[10px]">
                {[telegram, github, twitter, discord ].map((item) => ContactIcon(item))}
            </div>
        </div>
    );
}
export default MenuFoot