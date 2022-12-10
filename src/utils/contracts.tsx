import SubtitleSystemABI from "./abis/Murmes.json";
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
  "0x5": "0xD18bD5B3439c7994988534F2Bdbb64A0556085BB",
  "0x539": "0xe43ed01D7fdc971C0F6aD5a8F3c21f4ACb7c3dA8",
};

export const ZIMU_TOKEN: { [key: string]: string } = {
  "0x5": "0x195D1F8BC906f1129a1Ab177E7536CAe9b7E142b",
  "0x539": "0x1cFfc2D4e0D7d7EDb9e38c18849033698B4B8dA0",
};

export const VIDEO_TOKEN: { [key: string]: string } = {
  "0x5": "0xF0D5f127AC8e8582a2C3fE228203c1015c397d3E",
  "0x539": "0xE57aba9A9BB745Ef3171656E856c9C4a16827C53",
};

export const SUBTITLE_TOKEN: { [key: string]: string } = {
  "0x5": "0x223dbc19cA1636cCd044F8eef5c0d829fA632C4c",
  "0x539": "0x60f69c3Df81899E19048f4217cBd9E2D6f67501f",
};

export const VAULT_MANAGER: { [key: string]: string } = {
  "0x5": "0xE9aF9E85E0D3aD5c38Fb3cd71fecAb694030787e",
};

export const PLATFORM_MANAGER: { [key: string]: string } = {
  "0x5": "0xcf757954A689834dE86182476E38e22A3fE645d4",
};

export const ACCESS_STRATEGY: { [key: string]: string } = {
  "0x5": "0x8bA47eBcc3877ddE208de5abE5a5Cb973CF44437",
  "0x539": "0xca4B4FF4d9AA63348930C64be121c0500BeFd409",
};

export const AUDIT_STRATEGY: { [key: string]: string } = {
  "0x5": "0xb3963a71d52E6270Bc6C066fC36DB94B20F6fE92",
};

export const DETECTION_STRATEGY: { [key: string]: string } = {
  "0x5": "0x90b2573320191040E05471FECE0305cDd6700cB2",
};

export const SETTLEMENT_OT0: { [key: string]: string } = {
  "0x5": "0x61F10AbA9e6087c1EA315d1651BF09977ee466d7",
};

export const SETTLEMENT_DR1: { [key: string]: string } = {
  "0x5": "0x2c7EFFBc537E3a9404d0637297C6E3C22Ee00217",
};

export const SETTLEMENT_OTM2: { [key: string]: string } = {
  "0x5": "0xbBdD22dFE991F5366AC6895B18c6A2Fe11c892f1",
};
