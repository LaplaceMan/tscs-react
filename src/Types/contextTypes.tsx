import { ethers } from "ethers";
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
  Require,
  ListRequire,
  ListToken,
  ListModule,
} from "./baseTypes";
import {
  AuditItem,
  RealTokenTransaction,
  TokenTransaction,
  WithdrawReward,
  PostTask,
  SubmitItem,
  GetLockedReward,
  ManageDeposit,
  PreExtract,
  UpdateTask,
} from "./formTypes";

export type ApplicationContent = {
  postTask: (params: PostTask) => void;
  submitItem: (params: SubmitItem) => void;
  auditItem: (params: AuditItem) => void;
  tokenTransaction: (params: RealTokenTransaction) => void;
  defaultTokenTransactionData: TokenTransaction | null;
  updateDefaultTokenTransaction: (params: TokenTransaction) => void;
  preExtract: (params: PreExtract) => void;
  updateDefaultUpdateTask: (param: string) => void;
  defaultUpdateTaskData: string | null;
  updateTask: (params: UpdateTask) => void;
  withdraw: (params: WithdrawReward) => void;
  manageDeposit: (params: ManageDeposit) => void;
  getPTBalance: (
    address: string
  ) => Promise<ethers.BigNumber[] | undefined | null>;
  cancelTask: (param: string) => void;
  updateRevenueInLens: (videoId: string) => void;
  swapRevenueInLens: (amount: string) => void;
  getLensRevenueSettlable: (videoId: string) => void;
  lensSettleable: string;
  registerRequire: (param: string) => void;
  getLockedReward: (params: GetLockedReward) => Promise<ethers.BigNumber | null | undefined>;
  setGuard: (param: string) => void;
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
  querySpecialTask: (
    id: string
  ) => Promise<{ task: Task; items: ListItem[] | null } | null | undefined>;
  requires: Require[] | null;
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
  queryWhitelistedTokens: () => Promise<ListToken[] | null | undefined>;
  queryWhitelistedAuditAndDetectionModules: () => Promise<
    | { audit: null | ListModule[]; detection: null | ListModule[] }
    | null
    | undefined
  >;
  querySpecialRequire: (
    filter: string,
    id: string
  ) => Promise<
    | { details: ListRequire; entities: (ListTask | ListItem)[] }
    | null
    | undefined
  >;
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
  showDepositAssetModal: () => void;
  hideDepositAssetModal: () => void;
  isDepositAssetModalOpen: boolean;
  showGuardManageModal: () => void;
  hideGuardManageModal: () => void;
  isGuardManageModalOpen: boolean;
};
