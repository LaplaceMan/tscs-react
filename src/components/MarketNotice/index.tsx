import { List, Tag } from 'antd';
import NoticeItems from "./NoticeItems"
import React from 'react';

const StateMapLabel: {[k:string]:string} = {'success': 'Update', 'processing': 'Proposal', 'warning': 'Warn', 'default': 'News'}

const RenderItem = (data: {info: string, label: string}):React.ReactElement => {
    return(
        <div>
            <Tag color={StateMapLabel[data.label]}>{data.info}</Tag>
        </div>
    )
}

const MarketNotice = () => {
    return(
        <div>
            <List
                size="small"
                header={<div>Notice</div>}
                dataSource={NoticeItems}
                renderItem={item => <List.Item>{RenderItem(item)}</List.Item>}
            />
        </div>
    )
}
export default MarketNotice