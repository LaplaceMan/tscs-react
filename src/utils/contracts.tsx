import SubtitleSystemABI from "./abis/SubtitleSystem.json"
import ZimuTokenABI from "./abis/ZimuToken.json"
import ERC20ABI from "./abis/ERC20.json"
export const SUBTITLE_SYSTEM_ABI = SubtitleSystemABI.abi
export const ZIMU_TOKEN_ABI = ZimuTokenABI.abi
export const ERC20_ABI = ERC20ABI.abi
export const ZIMU_TOKEN: { [key: string]: string } = {
    "0x539": "0x9b6E076481ae5B94a7fCf0AfBE0Cbaf1fe76BA33"
}

export const SUBTITLE_SYSTEM: { [key: string]: string } = {
    "0x5": "0x3f204Fcde7E2434FbC2BCdfF370e10065e499374",
    "0x539": "0xC061eCb4E7435406272944164EfC33B47f0EC5B3"
}