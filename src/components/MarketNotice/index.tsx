import { List, Tag } from 'antd';
import NoticeItems from './NoticeItems'
import React from 'react';

const StateMapLabel: {[k:string]:string} = {'success': 'Update', 'processing': 'Proposal', 'warning': 'Warn', 'default': 'News'}

const RenderItem = (data: {info: string, label: string}):React.ReactElement => {
    return(
        <div className='text-[#717579] text-[0.5vw] whitespace-nowrap'>
            <Tag color={data.label}>{StateMapLabel[data.label]}</Tag> {data.info}
        </div>
    )
}

const MarketNotice = () => {
    return(
        <div className='bg-white px-[0.8vw] pt-[0.5vw] rounded-[12px] w-[20.5vw] min-w-[254px]'>
            <List
                size='small'
                header={<div className='text-[1vw]
                 font-semibold'>Notice</div>}
                dataSource={NoticeItems}
                renderItem={item => <List.Item>{RenderItem(item)}</List.Item>}
            />
        </div>
    )
}
export default MarketNotice