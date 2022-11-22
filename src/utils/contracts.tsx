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
  "0x5": "0x780EEE0D38101f100eC01C391EF6f623BC652866",
  "0x539": "0xe43ed01D7fdc971C0F6aD5a8F3c21f4ACb7c3dA8",
};

export const ZIMU_TOKEN: { [key: string]: string } = {
  "0x5": "0x9EDF2544Cd7668349d1312B27ACc94cfDC8D7D06",
  "0x539": "0x1cFfc2D4e0D7d7EDb9e38c18849033698B4B8dA0",
};

export const VIDEO_TOKEN: { [key: string]: string } = {
  "0x5": "0x01435069B2653fBfFB77803D9b6244E03C122753",
  "0x539": "0xE57aba9A9BB745Ef3171656E856c9C4a16827C53",
};

export const SUBTITLE_TOKEN: { [key: string]: string } = {
  "0x5": "0x13a5318b68e95e46C4dF661083142afB1eC4868F",
  "0x539": "0x60f69c3Df81899E19048f4217cBd9E2D6f67501f",
};

export const ACCESS_STRATEGY: { [key: string]: string } = {
  "0x5": "0x67CEA4D1210fb67067539e476EcC1160E4d5D62e",
  "0x539": "0xca4B4FF4d9AA63348930C64be121c0500BeFd409",
};

export const AUDIT_STRATEGY: { [key: string]: string } = {
  "0x5": "0x5E09452baFD50F26760362338d0aD3615CF806c1",
};

export const DETECTION_STRATEGY: { [key: string]: string } = {
  "0x5": "0xeB93Ea412D8dCfaEdCc140fA4a9B685F197B97Cf",
};

export const SETTLEMENT_OT0: { [key: string]: string } = {
  "0x5": "0x9A274a2fB7bC99f12d6af5E967998423798E275f",
};

export const SETTLEMENT_DR1: { [key: string]: string } = {
  "0x5": "0x572FcBDEe7bbcE6a771AF06847590B28c740dE6b",
};

export const SETTLEMENT_OTM2: { [key: string]: string } = {
  "0x5": "0xe09F4e7e4A361D813a8CB3D3b531f66A1691de9D",
};
