import React from 'react'
import DashboardPersonalItems from "./DashboardPersonalItems"

const Shape = (data: { info: string, count: string, color: string }): React.ReactElement => {
    return (
        <div className={`flex flex-col items-center justify-between text-white font-medium w-[3vw] p-[1vw] rounded-full`} style={{background: data.color}}> 
            <div style={{ writingMode: 'vertical-rl' }}>{data.info}</div>
            <div>{data.count}</div>
        </div>
    )
}
const DashboardPersonal = ():React.ReactElement => {
    return (
        <div className='flex flex-row ml-[0.9vw] w-[15vw] justify-between h-[10vw] min-h-[140px] max-h-[25vw]'>
            {DashboardPersonalItems.map((item) => Shape(item))}
        </div>
    )
}

export default DashboardPersonal