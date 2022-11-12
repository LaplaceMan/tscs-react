import { Submit, Upload, Audit, ApproveTransaction } from "./formTypes";

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

export let defaultApplication: Application = {
  applicant: '',
  vidoId: '',
  platformName: '',
  applyId: '',
  language: '',
  amount: '',
  payType: '',
  uploads: '',
  start: 0,
  deadline: 0,
  source: ''
}

export type Subtitle = {
  applyId: string;
  payType: string;
  platformName: string;
  subtitleId: string;
  language: string;
  support: string;
  oppose: string;
  maker: string;
  uploads: string;
  start: number;
  deadline: number;
  fingerprint: string;
  cid: string;
};

export let defaultSubtitle: Subtitle = {
  applyId: '',
  payType: '',
  platformName: '',
  subtitleId: '',
  language: '',
  support: '',
  oppose: '',
  maker: '',
  uploads: '',
  start: 0,
  deadline: 0,
  fingerprint: '',
  cid: ''
}

export type Dashboard = {
  applicationCount: string;
  userCount: string;
  subtitleCount: string;
  platformCount: string;
  applicationInc: string;
  userInc: string;
  platformInc: string;
  subtitleInc: string;
}

export let defaultDashboard = {
  applicationCount: "0",
  userCount: "0",
  subtitleCount: "0",
  platformCount: "0",
  applicationInc: "0",
  userInc: "0",
  platformInc: "0",
  subtitleInc: "0"
}

export type User = {
  id: string;
  reputation: string;
  deposit: string;
  adopted: string;
  join: number;
}

export let defaultUser = {
  id: '',
  reputation: '0',
  deposit: '0',
  adopted: '0',
  join: 0
}

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
};

export type GlobalContent = {
  isLoading: boolean;
  isUploadModalOpen: boolean;
  isApplicationModalOpen: boolean;
  isAuditModalOpen: boolean;
  isConnectWalletModalOpen: boolean;
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
  showConnectWalletModal: () => void;
  hideConnectWalletModal: () => void;
};

export type OwnToken = {
  name: string;
  balance: string;
  type: string;
  issuser: string;
  address: string;
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
}

export let defaultOwnApplication = {
  name: "",
  type: "",
  price: "0",
  state: "",
  source: "",
  videoId: "0",
  applyId: "0",
  language: "0"
}

export type OwnSubtitle = {
  subtitleId: string;
  cid: string;
  support: string;
  oppose: string;
  state: string;
  applyId: string;
  language: string;
}

export let defaultOwnSubtitle = {
  subtitleId: "0",
  cid: "",
  support: "0",
  oppose: "0",
  state: "",
  applyId: "0",
  language: ""
}

export type OwnAudit = {
  cid: string;
  state: string;
  applyId: string;
  language: string;
  attitude: string;
  subtitleId: string;
}

export let defaultOwnAudit = {
  cid: "",
  state: "",
  applyId: "0",
  language: "",
  attitude: "",
  subtitleId: "0"
}

export type UserOwn = {
  applications: OwnApplication[],
  subtitles: OwnSubtitle[],
  audits: OwnAudit[]
}

export let defaultUserOwn = {
  applications: [defaultOwnApplication],
  subtitles: [defaultOwnSubtitle],
  audits: [defaultOwnAudit]
}

export type ApplicationContent = {
  userDID: { reputation: string, deposit: string };
  defaultUploadSubtitleData: { applyId: string; language: number };
  updateDefaultUploadSubtitleData: (applyId: string, language: number) => void;
  defaultAuditSubtitleData: Subtitle;
  updateDefaultAuditSubtitleData: (subtitle: Subtitle) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenApprove: (params: ApproveTransaction) => void
};

export type DataContent = {
  applications: Application[],
  subtitles: Subtitle[],
  queryApplicationData: () => void,
  dashboard: Dashboard,
  queryHomeData: () => void,
  querySubtitleData: () => void,
  defaultAuditSubtitleMaker: User,
  userOwnData: UserOwn,
  queryUserOwnApplicationData: (address: string) => void,
  queryUserOwnSubtitleData: (address: string) => void,
  queryUserOwnAuditData: (address: string) => void,
  queryUserData: (address: string) => void
}

