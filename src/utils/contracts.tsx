import ERC20ABI from "./abis/IERC20.json";
import ERC1155ABI from "./abis/IERC1155.json";
import ERC721ABI from "./abis/IERC721.json";
import MurmesABI from "./abis/Murmes.json";
import LensABI from "./abis/ILensHub.json";
import PlatformsABI from "./abis/IPlatforms.json";
import LensAuthorityABI from "./abis/LensAuthority.json";
import SettlementABI from "./abis/Settlement.json";

export const MURMES_PROTOCOL_ABI = MurmesABI;
export const ERC20_ABI = ERC20ABI;
export const ERC1155_ABI = ERC1155ABI;
export const ERC721_ABI = ERC721ABI;
export const LENS_ABI = LensABI;
export const PLATFORMS_ABI = PlatformsABI;
export const LENS_AUTHORITY_ABI = LensAuthorityABI;
export const SETTLEMENT_MANAGER_ABI = SettlementABI;

export const LENS_PROTOCOL: { [key: number]: string } = {
  80001: "0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5",
};

export const LENS_AUTHORITY: { [key: number]: string } = {
  80001: "0xE41136A82771aA37b474eCE1a29Ba9826823131A",
};

export const MURMES_PROTOCOL: { [key: number]: string } = {
  5: "0xD18bD5B3439c7994988534F2Bdbb64A0556085BB",
  80001: "0x2E2F1434Ce4D4Ec45bE6C3Cf4c6C70767D46259f",
  1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export const PLATFORM_MANAGER: { [key: number]: string } = {
  5: "0x223dbc19cA1636cCd044F8eef5c0d829fA632C4c",
  80001: "0xea241696708f147bAad0baC2f0aFD5A265DEb0E3",
  1337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  31337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
};

export const PLATFORM_TOKEN: { [key: number]: string } = {
  5: "0xF0D5f127AC8e8582a2C3fE228203c1015c397d3E",
  80001: "0x6FAEB796a7C0ecadE262c80F1503A777135860f6",
  1337: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  31337: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
};

export const ITEM_TOKEN: { [key: number]: string } = {
  5: "0x223dbc19cA1636cCd044F8eef5c0d829fA632C4c",
  80001: "0x86C57f0be2b5a7bA45F5E913Cf973060405CA4bD",
  1337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  31337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
};

export const SETTLEMENT_MANAGER: {[key: number]: string} = {
  5: "0x223dbc19cA1636cCd044F8eef5c0d829fA632C4c",
  80001: "0xfbB0B5FDb83f8DD0B7c705cb06a7dd0ce8F87162",
  1337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  31337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
}