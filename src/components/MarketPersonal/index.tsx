import React from 'react';
import { TinyArea } from '@ant-design/plots';
import MarketPersonalItems from './MarketPersonalItems'
const data = [
    264, 307, 438, 850, 437, 400, 356
];
const config = {
  autoFit: false,
  data,
  smooth: true,
  color: '#e6f7ff'
};
const MarketPersonalItemsCard = (data: {info: string, count: number, label: string, ed: number, change: string}, key: React.Key) => {
    return (
        <div className='flex flex-col items-center bg-white rounded-[12px] p-[1vh] w-[7vw] h-[8.9vw] min-w-[100px] min-h-[110px] max-h-[25vw]' key={key}>
            <div className='text-[0.8vw] font-semibold text-[#7d7d7d]'>{data.info}</div>
            <div className='text-[1.2vw] font-semibold mt-[0.2vw]'>{data.count}</div>
            <TinyArea {...config} style={{ width: '5.5vw', height: '2.5vw', minWidth: '74px', minHeight: '20px'}} />
            <div className='flex flex-col w-full'>
            <div className='text-[0.5vw]'>
                { data.label}
            </div>
            <div className='flex flex-row justify-between text-[#7d7d7d]'>
                    {data.ed}
                    <div className='text-[#76beff] font-[1vw]'>{data.change}</div>
            </div>
            </div>
        </div>
    )
}

const MarketPersonal = (): React.ReactElement => {
    return (
        <div className='flex flex-row ml-[1vw] items-center justify-between'>
            {MarketPersonalItems.map((item, index)=>MarketPersonalItemsCard(item, index))}
        </div>
    )
}

export default MarketPersonal