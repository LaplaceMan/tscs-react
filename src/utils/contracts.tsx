import SubtitleSystemABI from "./abis/SubtitleSystem.json";
import ZimuTokenABI from "./abis/ZimuToken.json";
import ERC20ABI from "./abis/ERC20.json";
import ERC1155ABI from "./abis/ERC1155.json";
import ERC721ABI from "./abis/ERC721.json";
import ACCESSABI from "./abis/AccessStrategy.json";

export const SUBTITLE_SYSTEM_ABI = SubtitleSystemABI.abi;
export const ZIMU_TOKEN_ABI = ZimuTokenABI.abi;
export const ERC20_ABI = ERC20ABI.abi;
export const ERC1155_ABI = ERC1155ABI.abi;
export const ERC721_ABI = ERC721ABI.abi;
export const ACCESS_ABI = ACCESSABI.abi;

export const SUBTITLE_SYSTEM: { [key: string]: string } = {
  "0x539": "0xe43ed01D7fdc971C0F6aD5a8F3c21f4ACb7c3dA8",
};

export const ZIMU_TOKEN: { [key: string]: string } = {
  "0x539": "0x1cFfc2D4e0D7d7EDb9e38c18849033698B4B8dA0",
};

export const VIDEO_TOKEN: { [key: string]: string } = {
  "0x539": "0xE57aba9A9BB745Ef3171656E856c9C4a16827C53",
};

export const SUBTITLE_TOKEN: { [key: string]: string } = {
  "0x539": "0x60f69c3Df81899E19048f4217cBd9E2D6f67501f",
};

export const ACCESS_STRATEGY: { [key: string]: string } = {
  "0x539": "0xca4B4FF4d9AA63348930C64be121c0500BeFd409",
};
