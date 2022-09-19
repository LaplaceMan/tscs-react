import { SiEthereum } from "react-icons/si";

const MarketIDCard = (): React.ReactElement => {
    return (
        <div className="flex flex-col items-center justify-start ">
        <div className="p-3 justify-end items-start flex-col ml-[1vw] rounded-[12px] eth-card white-glassmorpism w-[15.5vw] h-[10vw] min-w-[200px] min-h-[140px] max-h-[25vw]">
            <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-full border-2 border-white flex justify-center items-center">
                        <SiEthereum fontSize={21} color="#fff"/>
                    </div>
                </div>
                <div>
                    <div className="text-white font-light text-sm">
                        0x000
                    </div>
                    <div className="text-white font-semibold text-base">
                        Ethereum
                    </div>
                </div>
            </div>
            </div>
            </div>
    )
}

export default MarketIDCard