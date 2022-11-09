import { Submit, Upload, Audit, ApproveTransaction } from "./formTypes";

export type Application = {
  applicant: string;
  vidoId: number;
  videoName: string;
  platformName: string;
  applyId: number;
  language: string;
  amount: string;
  payType: string;
  uploads: number;
  start: number;
  deadline: number;
  source: string;
};

export type Subtitle = {
  videoName: string;
  applyId: number;
  payType: string;
  platformName: string;
  subtitleId: number;
  language: string;
  support: number;
  against: number;
  maker: string;
  uploads: number;
  start: number;
  deadline: number;
  fingerprint: string;
  cid: string;
};

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

export type Token = {
  name: string;
  balance: string;
  type: string;
  issuser: string;
  address: string;
};

export type ApplicationContent = {
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
  defaultUploadSubtitleData: { applyId: number; language: number };
  updateDefaultUploadSubtitleData: (applyId: number, language: number) => void;
  defaultAuditSubtitleData: Subtitle;
  updateDefaultAuditSubtitleData: (subtitle: Subtitle) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenApprove: (params: ApproveTransaction) => void
};


export let defaultSubtitle: Subtitle = {
  subtitleId: 0,
  videoName: "",
  payType: "",
  applyId: 0,
  platformName: "",
  language: "",
  support: 0,
  against: 0,
  maker: "",
  uploads: 0,
  start: 0,
  deadline: 0,
  fingerprint: "",
  cid: ""
}
