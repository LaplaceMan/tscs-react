import ERC20ABI from "./abis/IERC20.json";
import ERC1155ABI from "./abis/IERC1155.json";
import ERC721ABI from "./abis/IERC721.json";
import MurmesABI from "./abis/Murmes.json";
import ZimuTokenABI from "./abis/IZimu.json";
import ACCESSABI from "./abis/IAccessStrategy.json";
import AuthorityABI from "./abis/IAuthorityStrategy.json";
import PlatformABI from "./abis/IPlatform.json";
import LensABI from "./abis/ILensHub.json";

export const MURMES_PROTOCOL_ABI = MurmesABI;
export const TEST_TOKEN_ABI = ZimuTokenABI;
export const ERC20_ABI = ERC20ABI;
export const ERC1155_ABI = ERC1155ABI;
export const ERC721_ABI = ERC721ABI;
export const ACCESS_ABI = ACCESSABI;
export const AUTHORITY_ABI = AuthorityABI;
export const PLATFROM_ABI = PlatformABI;
export const LENS_ABI = LensABI;

export const LENS_PROTOCOL: { [key: number]: string } = {
  80001: "0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5",
};

export const MURMES_PROTOCOL: { [key: number]: string } = {
  5: "0xD18bD5B3439c7994988534F2Bdbb64A0556085BB",
  80001: "0x87042950BFCE9b365E3C1E21C5DD343Cb8AcDA95",
  1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export const TEST_TOKEN: { [key: number]: string } = {
  5: "0x195D1F8BC906f1129a1Ab177E7536CAe9b7E142b",
  80001: "0x8928C5568a7Bc0da7F0f2CF6027AC7F3f8bf68f3",
};

export const PLATFORM_TOKEN: { [key: number]: string } = {
  5: "0xF0D5f127AC8e8582a2C3fE228203c1015c397d3E",
  80001: "0xb70B66d5185E47C234e6779be4C552f80AA19425",
  1337: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
};

export const ITEM_TOKEN: { [key: number]: string } = {
  5: "0x223dbc19cA1636cCd044F8eef5c0d829fA632C4c",
  80001: "0xF5A0BAcB03958E1b5EBdA72C6963C9FC19e021dF",
  1337: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
};

export const VAULT_MANAGER: { [key: number]: string } = {
  5: "0xE9aF9E85E0D3aD5c38Fb3cd71fecAb694030787e",
  80001: "0x664F3747fB045672FA2a84f50540CBe4bDf52832",
  1337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
};

export const PLATFORM_MANAGER: { [key: number]: string } = {
  5: "0xcf757954A689834dE86182476E38e22A3fE645d4",
  80001: "0xa671E667552218A495B2F5a53ec0B681f1c965c5",
  1337: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
};

export const ACCESS_STRATEGY: { [key: number]: string } = {
  5: "0x8bA47eBcc3877ddE208de5abE5a5Cb973CF44437",
  80001: "0x4915Fb358464A9b7Ab1E41834de6476baa7Fc1C3",
};

export const AUDIT_STRATEGY: { [key: number]: string } = {
  5: "0xb3963a71d52E6270Bc6C066fC36DB94B20F6fE92",
  80001: "0x990214635329D55e4Cc3C7d6e32a400b22A5a31e",
};

export const AUTHORITY_STRATEGY: { [key: number]: string } = {
  5: "0xbBdD22dFE991F5366AC6895B18c6A2Fe11c892f1",
  80001: "0x7851CB87dbDF86Dd76ee1e8BD1D6Cfe95446d2Ed",
};

export const DETECTION_STRATEGY: { [key: number]: string } = {
  5: "0x90b2573320191040E05471FECE0305cDd6700cB2",
  80001: "0x75629924914ba13A15c949b44e2e565D8103fC70",
};

export const SETTLEMENT_OT0: { [key: number]: string } = {
  5: "0x61F10AbA9e6087c1EA315d1651BF09977ee466d7",
  80001: "0x7cE090BfD917c5eE49FA04a42A14c35f4237D296",
};

export const SETTLEMENT_DR1: { [key: number]: string } = {
  5: "0x2c7EFFBc537E3a9404d0637297C6E3C22Ee00217",
  80001: "0x6040AeF09e463aE01E6d9439a0fFfa11aD6B874f",
};

export const SETTLEMENT_OTM2: { [key: number]: string } = {
  5: "0xbBdD22dFE991F5366AC6895B18c6A2Fe11c892f1",
  80001: "0x844BFdb48615aE498EB6da9D94f5ee42eB462f1f",
};
