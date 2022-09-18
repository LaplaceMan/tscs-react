import React from "react"
import logo from "../../assets/logo.svg"
const MenuLogo = ():React.ReactElement => {
    return (
        <div className="flex h-[3.8rem] mx-[0.96rem] mt-[0.96rem] items-center justify-center">
            <img src={logo} width="140rem"/>
        </div>
    )
}
export default MenuLogo