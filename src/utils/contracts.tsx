import SubtitleSystemABI from "./abis/SubtitleSystem.json"
import ZimuTokenABI from "./abis/ZimuToken.json"
import ERC20ABI from "./abis/ERC20.json"
export const SUBTITLE_SYSTEM_ABI = SubtitleSystemABI.abi
export const ZIMU_TOKEN_ABI = ZimuTokenABI.abi
export const ERC20_ABI = ERC20ABI.abi
export const ZIMU_TOKEN: { [key: string]: string } = {
    "0x539": "0xf7f8166c375ddaC6CFbef4cc0eb97ae8958aef1A"
}

export const SUBTITLE_SYSTEM: { [key: string]: string } = {
    "0x539": "0x73E5CE1acDcBF67C48960Cc8353A7c18436Ad29B"
}