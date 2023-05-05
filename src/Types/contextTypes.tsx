import {
  Item,
  Task,
  Dashboard,
  User,
  OwnTaskCard,
  OwnItemCard,
  OwnAuditCard,
  ListTask,
  ListItem,
  ListUser,
  ListPlatform,
  ListAudit,
  ListReuire,
} from "./baseTypes";
import {
  Upload,
  Audit,
  RealTokenTransaction,
  Submit,
  TokenTransaction,
  UpdateApplication,
  RealUpdateApplictaionTransaction,
  RealWithdrawRewardTransaction,
} from "./formTypes";

export type ApplicationContent = {
  defaultUploadSubtitleData: { applyId: string; language: string };
  updateDefaultUploadSubtitleData: (applyId: string, language: string) => void;
  defaultAuditSubtitleData: Item | undefined;
  updateDefaultAuditSubtitleData: (subtitle: Item) => void;
  submitApplication: (params: Submit) => void;
  uploadSubtitle: (params: Upload) => void;
  auditSubtitle: (params: Audit) => void;
  tokenTransaction: (params: RealTokenTransaction) => void;
  defaultTokenTransactionData: TokenTransaction;
  updateDefaultTokenTransaction: (params: TokenTransaction) => void;
  preSettlement: (type: string, applyId: string) => void;
  updateDefaultUpdateApplication: (params: UpdateApplication) => void;
  defaultUpdateApplicationData: UpdateApplication;
  updateDefaultWithdrawOrDeposit: (platform: string, manage: string) => void;
  defaultWithdrawOrDepositData: { platform: string; manage: string };
  updateApplication: (params: RealUpdateApplictaionTransaction) => void;
  withdrawReward: (params: RealWithdrawRewardTransaction) => void;
  depoitZimuManage: (address: string, amount: number) => void;
  getPersonalPageData: (address: string) => void;
  cancelApplication: (taskId: string) => void;
  updateRevenueInLens: (videoId: string) => void;
  swapRevenueInLens: (amount: string) => void;
  getLensRevenueSettlable: (videoId: string) => void;
  lensSettleable: string;
};

export type DataContent = {
  queryTasks: (
    first: number,
    skip: number,
    require: string
  ) => Promise<ListTask[] | null | undefined>;
  dashboard: Dashboard | null;
  queryDashboard: () => void;
  queryItems: (
    first: number,
    skip: number,
    language: string
  ) => Promise<ListItem[] | null | undefined>;
  queryUsers: (
    first: number,
    skip: number
  ) => Promise<ListUser[] | null | undefined>;
  queryUserLockedToken: (platform: string, day: number) => void;
  querySpecialTask: (
    id: string
  ) => Promise<{ task: Task; items: ListItem[] | null } | null | undefined>;
  requires: ListReuire[] | null;
  platforms: ListPlatform[] | null;
  isGetDataLoading: boolean;
  queryRequires: () => void;
  queryPlatforms: () => void;
  querySpecialItem: (
    id: string
  ) => Promise<{ item: Item; audits: ListAudit[] | null } | null | undefined>;
  querySpecialUser: (
    id: string
  ) => Promise<{ item: User; tasks: OwnTaskCard[] | null } | null | undefined>;
  querySpecialUserOwnItems: (
    id: string
  ) => Promise<OwnItemCard[] | null | undefined>;
  querySpecialUserOwnTasks: (
    id: string
  ) => Promise<OwnTaskCard[] | null | undefined>;
  querySpecialUserOwnAudits: (
    id: string
  ) => Promise<OwnAuditCard[] | null | undefined>;
};

export type GlobalContent = {
  isLoading: boolean;
  isAuditModalOpen: boolean;
  showAuditModal: () => void;
  hideAuditModal: () => void;
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingState: (state: boolean) => void;
  isTokenTransactionModalOpen: boolean;
  showTokenTransactionModal: () => void;
  hideTokenTransactionModal: () => void;
  showUpdateTaskModal: () => void;
  hideUpdateTaskModal: () => void;
  isUpdateTaskModalOpen: boolean;
  showWithdrawRewardModal: () => void;
  hideWithdrawRewardModal: () => void;
  isWithdrawRewardModalOpen: boolean;
  showDepositAssetModal: () => void;
  hideDepositAssetModal: () => void;
  isDepositAssetModalOpen: boolean;
  showGuardManageModal: () => void;
  hideGuardManageModal: () => void;
  isGuardManageModalOpen: boolean;
};
