import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { WalletContext } from "../../context/WalletContext"
const UserNotFound = () => {
    const { showConnectWalletModal } = useContext(GlobalContext)
    const { accountState } = useContext(WalletContext)
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <div>Not Fount</div>
            {!accountState.address &&
                <div className="flex items-center justify-center py-2 px-3 rounded-full w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold text-lg cursor-pointer hover:brightness-110 max-w-[250px]" onClick={showConnectWalletModal}>
                    Connect Wallet
                </div>}
        </div >
    )
}

export default UserNotFound