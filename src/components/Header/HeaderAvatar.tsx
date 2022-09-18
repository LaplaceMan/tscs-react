import { Avatar } from "antd"
import React from "react"
const HeaderAvatar = ():React.ReactElement => {
    return(
        <div className="flex flex-row">
            <div className="flex flex-col items-end justify-center mx-[10px]">
                <div className="flex font-semibold text-base">LaplasMan</div>
                <div className="flex text-xs text-[#717579]">@laplasman.eth</div>
            </div>
            <div className="flex mr-[20px] items-center">
                <Avatar src="https://img2.baidu.com/it/u=1675965550,4171435961&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663520400&t=55388c39c137f7e02412227ec7f7ed05" shape="square" size={37} />
            </div>
        </div>
    )
}
export default HeaderAvatar