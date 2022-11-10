import { OwnSubtitle } from "../../types/baseTypes"

const subtitleCardItem = (label: string, info: string) => {
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

const OwnSubtitleCard = (subtitle: OwnSubtitle) => {
    return (
        <div className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[300px] h-[180px] bg-gray-50 mt-5 mx-5">
            <div className="absolute bottom-[50px] blur-[50px] w-[100px] h-[50px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full " />
            <div className="flex flex-row items-center justify-center">
                <img
                    src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
                    className="flex rounded-full w-[50px] shadow"
                />
                <div className="flex flex-col items-start ml-3">
                    <div className="text-lg font-medium text-black">#{subtitle.subtitleId}</div>
                    <div className="flex test-sm bg-gray-100 px-2 rounded-md text-[#696969]">{subtitle.cid ? subtitle.cid : ''}</div>
                </div>
            </div>
            <div className="flex w-full flex-row justify-between items-center my-3">
                {
                    subtitleCardItem('Adopt', subtitle.support)
                }
                <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
                {
                    subtitleCardItem('Report', subtitle.oppose)
                }
                <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
                {
                    subtitleCardItem('State', subtitle.state)
                }
                <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
                {
                    subtitleCardItem('Apply ID', subtitle.applyId)
                }
            </div>
            <div className="flex w-full justify-between text-white font-semibold text-base">
                <div className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center">Transfer</div>
                <div className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110">Approve</div>
            </div>
        </div>
    )
}

export default OwnSubtitleCard