import { MiniShowData0Package, MiniShowData1Package } from './MiniShowData'
import { Button, Progress } from 'antd'
import { CircleFlag } from 'react-circle-flags'
import { Application } from '../../Types/baseTypes'
import { TimeRemainPercentage } from "../../utils/tools"

const ApplyCard = (data: Application, key: React.Key):React.ReactElement => {
    console.log()

    return (
        <div className='flex flex-row bg-[white] p-2 rounded-md justify-between' key={key}>
            <div className='flex flex-col items-start'>
                <div className='flex flex-row items-center justify-center w-full'>
                    <div className='flex h-10'><CircleFlag countryCode='cn'/></div>
                    <div className='flex flex-col items-start ml-2'>
                        <div className='flex items-end text-lg font-semibold'>{data.videoName}<div className='text-sm text-gray-400 ml-1'>#{data.vidoId}</div></div>
                        <div className='flex text-sm text-gray-400'>{data.applicant}</div>
                    </div>
                </div>
                {MiniShowData0Package(data)}
            </div>
            <div className='flex flex-col items-center justify-between ml-5'>
                <div className='flex w-full flex-row items-center justify-between'>
                    {MiniShowData1Package(data)}
                    <div className='flex ml-5 h-5/6'>
                        <Button type='primary' style={{height: '100%', borderRadius: '0.375rem'}}> Upload </Button>
                    </div>    
                </div>
                <div className='flex w-full my-2'>
                    <Progress percent={TimeRemainPercentage(data.deadline, data.duration)} strokeColor='#1C1C1C' showInfo={false} />
                </div>
            </div>
        </div>
    )
}

export default ApplyCard