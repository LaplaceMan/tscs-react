import SubtitleSystemABI from "./abis/SubtitleSystem.json"
import ZimuTokenABI from "./abis/ZimuToken.json"
import ERC20ABI from "./abis/ERC20.json"
export const SUBTITLE_SYSTEM_ABI = SubtitleSystemABI.abi
export const ZIMU_TOKEN_ABI = ZimuTokenABI.abi
export const ERC20_ABI = ERC20ABI.abi
export const ZIMU_TOKEN: { [key: string]: string } = {
    "0x539": "0x74F2309cCdD3A8a46989289b39C6176e1B6BAeAd"
}

export const SUBTITLE_SYSTEM: { [key: string]: string } = {
    "0x5": "0x3f204Fcde7E2434FbC2BCdfF370e10065e499374",
    "0x539": "0xFAD53972470A332657bc9aA64B725f2dDd28cCe8"
}
