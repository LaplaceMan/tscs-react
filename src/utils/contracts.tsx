import SubtitleSystemABI from "./abis/SubtitleSystem.json";
import ZimuTokenABI from "./abis/ZimuToken.json";
import ERC20ABI from "./abis/ERC20.json";
import ERC1155ABI from "./abis/ERC1155.json";
import ERC721ABI from "./abis/ERC721.json";

export const SUBTITLE_SYSTEM_ABI = SubtitleSystemABI.abi;
export const ZIMU_TOKEN_ABI = ZimuTokenABI.abi;
export const ERC20_ABI = ERC20ABI.abi;
export const ERC1155_ABI = ERC1155ABI.abi;
export const ERC721_ABI = ERC721ABI.abi;

export const SUBTITLE_SYSTEM: { [key: string]: string } = {
  "0x539": "0x8F2246099AE3782804D076ba62022965DfaF8B96",
};

export const ZIMU_TOKEN: { [key: string]: string } = {
  "0x539": "0x0823B7761c015838B8c39A5BE260319EC446aCcE",
};

export const VIDEO_TOKEN: { [key: string]: string } = {
  "0x539": "0xe76CA7761a402d81FF1457b39c4D046068DB560d",
};

export const SUBTITLE_TOKEN: { [key: string]: string } = {
  "0x539": "0x9964834f26f08e16f53786BdFf2E7a98ea012299",
};

export const ACCESS_STRATEGY: { [key: string]: string } = {
  "0x539": "0x62A85512541e3f1f7E712C6bFdBc8f8f763ABe38",
};
