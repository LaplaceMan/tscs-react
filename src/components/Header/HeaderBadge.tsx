import { Badge } from 'antd'
import React from 'react'
import BedgeItems from './BedgeItems'

const Bedge = (bedge: React.ReactNode, count: number, key: React.Key):React.ReactElement => {
    return(
        <div key={key} className='flex items-center justify-center mx-[10px]'>
            <Badge count={count} size='small' dot={true}>
                {bedge}
            </Badge>
        </div>
    )
}
const HeaderBadge = ():React.ReactElement => {
    return(
        <div className='flex flex-row items-center justify-center'>
            {BedgeItems.map((item, index) => Bedge(item.bedge, item.count, index))}
        </div>
    )
}
export default HeaderBadge