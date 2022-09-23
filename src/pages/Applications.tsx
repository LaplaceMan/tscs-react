import { ApplyCard } from '../components'
import { Application } from '../Types/baseTypes'

const ApplicationItems: Application[] = [{
    vidoId: 50,
    videoName: 'Lulu',
    applyId: 5,
    platformName: 'Youtube',
    language: 'cn',
    payNumber: '20K',
    payType: 'OT0',
    applicant: '0x666...666',
    uploads: 5,
    duration: 604800,
    deadline: 1664058800
}]

const Applications = ():React.ReactElement => {
    return (
        <div className='flex flex-wrap w-full'>
            {ApplicationItems.map((item, index) => ApplyCard(item, index))}
        </div>
    )
}

export default Applications