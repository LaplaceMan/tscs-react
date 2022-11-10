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

export type NavbarItem = {
  title: string;
  link: string;
  icon: React.ReactElement;
};

export type DashboardMiniItem = {
  label: string;
  number: string;
  change: number;
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
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  scrollHeight: number;
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

export type OwnSubtitle = {
  subtitleId: string;
  cid: string;
  support: string;
  oppose: string;
  state: string;
  applyId: string;
  language: string;
}

export type OwnAudit = {
  cid: string;
  state: string;
  applyId: string;
  language: string;
  attitude: string;
  subtitleId: string;
}

export type ApplicationContent = {
  userDID: { reputation: string, deposit: string };
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
  defaultUploadSubtitleData: { applyId: string; language: number };
  updateDefaultUploadSubtitleData: (applyId: string, language: number) => void;
  defaultAuditSubtitleData: Subtitle;
  updateDefaultAuditSubtitleData: (subtitle: Subtitle) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenApprove: (params: ApproveTransaction) => void
};


