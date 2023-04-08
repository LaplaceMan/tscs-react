import {
  Submit,
  Upload,
  Audit,
  TokenTransaction,
  UpdateApplication,
  RealTokenTransaction,
  RealWithdrawRewardTransaction,
  RealUpdateApplictaionTransaction,
} from "./formTypes";
import { ethers } from "ethers";

export type PostTaskData = {
  amount: string;
  audit: string;
  currency: string;
  deadline: string;
  detection: string;
  payment: string;
  platform: string;
  require: string;
  source: string;
  sourceId: string;
  [key: string]: any;
};

export const defaultPostTaskData = {
  amount: "*",
  audit: "*",
  currency: "*",
  deadline: "*",
  detection: "*",
  payment: "*",
  platform: "*",
  require: "*",
  source: "*",
  sourceId: "*",
};

export type Application = {
  applicant: string;
  vidoId: string;
  platformName: string;
  applyId: string;
  language: string;
  amount: string;
  payType: string;
  uploads: string;
  start: number;
  deadline: number;
  source: string;
};

export const defaultApplication: Application = {
  applicant: "",
  vidoId: "",
  platformName: "",
  applyId: "",
  language: "",
  amount: "",
  payType: "",
  uploads: "",
  start: 0,
  deadline: 0,
  source: "",
};

export type Subtitle = {
  applyId: string;
  applySource: string;
  payType: string;
  platformName: string;
  subtitleId: string;
  language: string;
  support: string;
  oppose: string;
  maker: string;
  start: number;
  deadline: number;
  fingerprint: string;
  cid: string;
};

export const defaultSubtitle: Subtitle = {
  applyId: "",
  applySource: "",
  payType: "",
  platformName: "",
  subtitleId: "",
  language: "",
  support: "",
  oppose: "",
  maker: "",
  start: 0,
  deadline: 0,
  fingerprint: "",
  cid: "",
};

export type Dashboard = {
  applicationCount: string;
  userCount: string;
  subtitleCount: string;
  platformCount: string;
  applicationInc: string;
  userInc: string;
  platformInc: string;
  subtitleInc: string;
};

export const defaultDashboard = {
  applicationCount: "0",
  userCount: "0",
  subtitleCount: "0",
  platformCount: "0",
  applicationInc: "0",
  userInc: "0",
  platformInc: "0",
  subtitleInc: "0",
};

export type User = {
  id: string;
  reputation: string;
  deposit: string;
  adopted: string;
  join: number;
};

export const defaultUser = {
  id: "",
  reputation: "0",
  deposit: "0",
  adopted: "0",
  join: 0,
};

export type NavbarItem = {
  title: string;
  link: string;
  icon: React.ReactElement;
};

export type DashboardMiniItem = {
  label: string;
  tag: string;
  number: string;
  icon: React.ReactElement;
};

export type WalletContent = {
  accountState: {
    address: string;
    network: string;
    type: string;
  };
  connectWalletMetaMask: () => void;
  killSessionWalletConnect: () => void;
  gasPrice: string;
};

export type GlobalContent = {
  chainId: number;
  isLoading: boolean;
  isUploadModalOpen: boolean;
  isApplicationModalOpen: boolean;
  isAuditModalOpen: boolean;
  showUploadModal: () => void;
  hideUploadModal: () => void;
  showApplicationModal: () => void;
  hideApplicationModal: () => void;
  showAuditModal: () => void;
  hideAuditModal: () => void;
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingState: (state: boolean) => void;
  isTokenTransactionModalOpen: boolean;
  showTokenTransactionModal: () => void;
  hideTokenTransactionModal: () => void;
  showUpdateApplicationModal: () => void;
  hideUpdateApplicationModal: () => void;
  isUpdateApplicationModalOpen: boolean;
  showWithdrawRewardModal: () => void;
  hideWithdrawRewardModal: () => void;
  isWithdrawRewardModalOpen: boolean;
  showDespoitAssetModal: () => void;
  hideDespoitAssetModal: () => void;
  isDespoitAssetModalOpen: boolean;
};

export type OwnToken = {
  name: string;
  symbol: string;
  decimals: number;
  balance: ethers.BigNumber;
  type: string;
  issuser: string;
  address: string;
  tokenId: string;
};

export type OwnApplication = {
  name: string;
  type: string;
  price: string;
  state: string;
  source: string;
  videoId: string;
  applyId: string;
  language: string;
  deadline: string;
};

export const defaultOwnApplication = {
  name: "",
  type: "",
  price: "0",
  state: "",
  source: "",
  videoId: "0",
  applyId: "0",
  language: "0",
  deadline: "",
};

export type OwnSubtitle = {
  subtitleId: string;
  cid: string;
  support: string;
  oppose: string;
  state: string;
  applyId: string;
  language: string;
  type: string;
  platform: string;
  videoId: string;
};

export const defaultOwnSubtitle = {
  subtitleId: "0",
  cid: "",
  support: "0",
  oppose: "0",
  state: "",
  applyId: "0",
  language: "",
  type: "",
  platform: "",
  videoId: "",
};

export type OwnAudit = {
  cid: string;
  state: string;
  applyId: string;
  language: string;
  attitude: string;
  subtitleId: string;
  type: string;
  platform: string;
  videoId: string;
};

export const defaultOwnAudit = {
  cid: "",
  state: "",
  applyId: "0",
  language: "",
  attitude: "",
  subtitleId: "0",
  type: "",
  platform: "",
  videoId: "",
};

export type UserOwn = {
  applications: OwnApplication[];
  subtitles: OwnSubtitle[];
  audits: OwnAudit[];
};

export const defaultUserOwn = {
  applications: [defaultOwnApplication],
  subtitles: [defaultOwnSubtitle],
  audits: [defaultOwnAudit],
};

export type ApplicationContent = {
  defaultUploadSubtitleData: { applyId: string; language: string };
  updateDefaultUploadSubtitleData: (applyId: string, language: string) => void;
  defaultAuditSubtitleData: Subtitle;
  updateDefaultAuditSubtitleData: (subtitle: Subtitle) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenTransaction: (params: RealTokenTransaction) => void;
  defaultTokenTransactionData: TokenTransaction;
  updateDefaultTokenTransaction: (params: TokenTransaction) => void;
  preSettlement: (type: string, applyId: string) => void;
  updateDefaultUpdateApplication: (params: UpdateApplication) => void;
  defaultUpdateApplicationData: UpdateApplication;
  updateDefaultWithdrawOrDespoit: (platform: string, manage: string) => void;
  defaultWithdrawOrDespoitData: { platform: string; manage: string };
  updateApplication: (params: RealUpdateApplictaionTransaction) => void;
  withdrawReward: (params: RealWithdrawRewardTransaction) => void;
  depoitZimuManage: (address: string, amount: number) => void;
  personalDID: PersonalPageData;
  getPersonalPageData: (address: string) => void;
  cancelApplication: (taskId: string) => void;
  updateRevenueInLens: (videoId: string) => void;
  swapRevenueInLens: (amount: string) => void;
  getLensRevenueSettlable: (videoId: string) => void;
  lensSettleable: string;
};

export type PlayerBaseInfo = {
  applicant: string;
  platform: string;
  deadline: string;
  language: string;
  source: string;
  uploads: string;
  adopted: string;
  payType: string;
  start: string;
};

export type PlayerSubtitle = {
  id: string;
  maker: string;
  reputation: string;
  deposit: string;
  support: string;
  oppose: string;
  cid: string;
  fingerprint: string;
};

export const defaultPlayerBaseInfo = {
  applicant: "NaN",
  platform: "NaN",
  deadline: "",
  language: "NaN",
  source: "NaN",
  uploads: "NaN",
  adopted: "NaN",
  start: "",
  payType: "",
};

export type DataContent = {
  playerSubtitles: PlayerSubtitle[];
  playerBaseInfo: PlayerBaseInfo;
  applications: Application[] | null;
  subtitles: Subtitle[] | null;
  queryApplicationData: (first: number, skip: number, language: string) => void;
  dashboard: Dashboard | null;
  queryHomeData: () => void;
  querySubtitleData: (first: number, skip: number, language: string) => void;
  defaultAuditSubtitleMaker: User;
  userOwnData: UserOwn;
  queryUserOwnData: (address: string) => void;
  queryUserData: (address: string) => void;
  queryUserLockedToken: (platform: string, day: number) => void;
  querySpecialApplication: (id: string) => void;
  userDayLocakedToken: string;
  regiserLanguages: { id: string; notes: string }[];
  regiserPlatforms: { id: string; name: string }[];
  isGetDataLoading: boolean;
  clearData: () => void;
  queryRegiserLanugages: () => void;
  queryRegiserPlatforms: () => void;
};

export type PersonalPageData = {
  reputation: string;
  deposit: ethers.BigNumber;
  zimu: ethers.BigNumber;
  vt0: ethers.BigNumber;
  vt1: ethers.BigNumber;
  needed: ethers.BigNumber;
};

export const defaultPersonalPageData = {
  reputation: "0",
  deposit: ethers.BigNumber.from("0"),
  zimu: ethers.BigNumber.from("0"),
  vt0: ethers.BigNumber.from("0"),
  vt1: ethers.BigNumber.from("0"),
  needed: ethers.BigNumber.from("0"),
};
