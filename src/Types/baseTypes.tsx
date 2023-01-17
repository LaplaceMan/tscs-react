import {
  Submit,
  Upload,
  Audit,
  TokenTransaction,
  UpdateApplication,
} from "./formTypes";

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
  number: string;
  change: string;
  bg: string;
  iconBg: string;
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
  scrollHeight: number;
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
  balance: string;
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
  userDID: { reputation: string; deposit: string };
  defaultUploadSubtitleData: { applyId: string; language: string };
  updateDefaultUploadSubtitleData: (applyId: string, language: string) => void;
  defaultAuditSubtitleData: Subtitle;
  updateDefaultAuditSubtitleData: (subtitle: Subtitle) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenTransaction: (params: any) => void;
  defaultTokenTransactionData: TokenTransaction;
  updateDefaultTokenTransaction: (params: TokenTransaction) => void;
  preSettlement: (type: string, applyId: string) => void;
  updateDefaultUpdateApplication: (params: UpdateApplication) => void;
  defaultUpdateApplicationData: UpdateApplication;
  updateDefaultWithdrawOrDespoit: (platform: string, manage: string) => void;
  defaultWithdrawOrDespoitData: { platform: string; manage: string };
  updateApplication: (params: any) => void;
  withdrawReward: (params: any) => void;
  depoitZimuManage: (address: string, amount: string) => void;
  personalDID: PersonalPageData;
  getPersonalPageData: (address: string) => void;
};

export type DataContent = {
  applications: Application[];
  subtitles: Subtitle[];
  queryApplicationData: (first: number, skip: number, language: string) => void;
  dashboard: Dashboard;
  queryHomeData: () => void;
  querySubtitleData: (first: number, skip: number, language: string) => void;
  defaultAuditSubtitleMaker: User;
  userOwnData: UserOwn;
  queryUserOwnData: (address: string) => void;
  queryUserData: (address: string) => void;
  queryUserLockedToken: (platform: string, day: number) => void;
  userDayLocakedToken: string;
  regiserLanguages: { id: string; notes: string }[];
  regiserPlatforms: { id: string; name: string }[];
  isGetDataLoading: boolean;
};

export type PersonalPageData = {
  reputation: string;
  despoit: string;
  zimu: string;
  vt0: string;
  needed: string;
};

export const defaultPersonalPageData = {
  reputation: "0",
  despoit: "0",
  zimu: "0",
  vt0: "0",
  needed: "0",
};
