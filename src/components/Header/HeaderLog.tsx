import { BiWalletAlt, BiUserCircle } from 'react-icons/bi'
const UserLogInfo = (): React.ReactElement => {
    return(
        <li className='mx-4 cursor-pointer'>
            <BiUserCircle className='log'/>
        </li>
    )
}
const WalletLogInfo = (): React.ReactElement => {
    return(
        <li className='mx-4 cursor-pointer'>
            <BiWalletAlt className='log'/>
        </li>
    )
}

const HeaderLogItems = (): React.ReactElement => {
    return (
        <div className='flex items-center justify-center'>
            <UserLogInfo />
            <WalletLogInfo/>
        </div>
    )
}

export default HeaderLogItems