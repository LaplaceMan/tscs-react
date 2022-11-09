import { Token } from "../..//types/baseTypes"
import { shortenAddress } from "../../utils/tools"
import { ApplicationContext } from "../../context/ApplicationContext"
import { useContext } from "react"
const tokenCardItem = (label: string, info: string) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-[#696969]">
                {label}
            </div>
            <div className="text-base font-semibold text-black">
                {info}
            </div>
        </div>
    )
}

const TokenCard = (token: Token) => {
    const { tokenApprove } = useContext(ApplicationContext)
    return (
        <div className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[250px] h-[180px] bg-gray-50">
            <div className="absolute bottom-[50px] blur-[50px] w-[100px] h-[50px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full " />
            <div className="flex flex-row items-center justify-center">
                <img
                    src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
                    className="flex rounded-full w-[50px] shadow"
                />
                <div className="flex flex-col items-start ml-3">
                    <div className="text-lg font-medium text-black">{token.name}</div>
                    <div className="flex test-sm bg-gray-100 px-2 rounded-md text-[#696969]">{token.address ? shortenAddress(token.address) : '0x0000...0000'}</div>
                </div>
            </div>
            <div className="flex w-full flex-row justify-between items-center my-3">
                {
                    tokenCardItem('Balance', token.balance)
                }
                <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
                {
                    tokenCardItem('Type', token.type)
                }
                <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
                {
                    tokenCardItem('Issuer', token.issuser)
                }
            </div>
            <div className="flex w-full justify-between text-white font-semibold text-base">
                <div className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center">Transfer</div>
                <div className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110" onClick={() => tokenApprove({
                    type: token.type,
                    address: token.address,
                    to: '0xFAD53972470A332657bc9aA64B725f2dDd28cCe8',
                    tokenId: 0,
                    number: 100000000
                })}>Approve</div>
            </div>
        </div>
    )
}

export default TokenCard