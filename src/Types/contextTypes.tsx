import {
  Item,
  PersonalPageData,
  Task,
  Dashboard,
  User,
  UserOwn,
  ListTask,
  ListItem,
  ListUser,
  ListPlatform,
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
  personalDID: PersonalPageData;
  getPersonalPageData: (address: string) => void;
  cancelApplication: (taskId: string) => void;
  updateRevenueInLens: (videoId: string) => void;
  swapRevenueInLens: (amount: string) => void;
  getLensRevenueSettlable: (videoId: string) => void;
  lensSettleable: string;
};

export type DataContent = {
  users: ListUser[] | null;
  tasks: ListTask[] | null;
  items: ListItem[] | null;
  queryTasks: (first: number, skip: number, language: string) => void;
  dashboard: Dashboard | null;
  queryDashboard: () => void;
  queryItems: (first: number, skip: number, language: string) => void;
  defaultAuditSubtitleMaker: User;
  userOwnData: UserOwn;
  queryUserOwnData: (address: string) => void;
  queryUsers: (first: number, skip: number) => void;
  queryUserLockedToken: (platform: string, day: number) => void;
  querySpecialTask: (id: string) => Promise<Task | null | undefined>;
  userDayLocakedToken: string;
  regiserLanguages: { id: string; notes: string }[];
  platforms: ListPlatform[] | null;
  isGetDataLoading: boolean;
  clearData: () => void;
  queryRegiserLanugages: () => void;
  queryPlatforms: () => void;
  querySpecialItem: (id: string) => Promise<Item | null | undefined>;
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
