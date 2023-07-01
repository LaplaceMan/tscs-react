import { ethers } from "ethers";

export type PostTaskData = {
  amount: string;
  audit: string;
  currency: string;
  deadline: string;
  detection: string;
  payment: string;
  platform: string | null;
  require: string | null;
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

export type Task = {
  applicant: string;
  platform: string;
  boxId: string;
  require: string;
  requireId: string;
  payment: string;
  currency: string;
  amount: string;
  start: string;
  deadline: string;
  source: string;
  audit: string;
  detection: string;
  state: string;
  uploads: string;
  adopted: string;
};

export type ListTask = {
  key: string;
  id: string;
  require: string;
  payment: string;
  currency: string;
  amount: string;
  audit: string;
  detection: string;
  state: string;
};

export type Item = {
  taskId: string;
  maker: string;
  support: string;
  opponent: string;
  source: string;
  fingerprint: string;
  time: string;
  require: string;
  taskSource: string;
  audit: string;
  detection: string;
  versions: string;
  state: string;
};

export type ListItem = {
  key: string;
  id: string;
  task: string;
  require: string;
  support: string;
  oppose: string;
  state: string;
  source: string;
  fingerprint: string;
};

export type ListToken = {
  key: string;
  symbol: string;
  decimal: string;
};

export type ListModule = {
  key: string;
  name: string;
};

export type Dashboard = {
  taskCount: string;
  userCount: string;
  platformCount: string;
  itemCount: string;
};

export type User = {
  id: string;
  reputation: string;
  deposit: string;
  guard: string;
  join: string;
  userId: string;
};

export type ListUser = {
  key: string;
  id: string;
  address: string;
  reputation: string;
  deposit: string;
  tasks: string;
  items: string;
  audits: string;
  guard: string;
};

export type ListPlatform = {
  key: string;
  id: string;
  name: string;
  owner: string;
  authority: string;
  rate1: string;
  rate2: string;
  boxes: string;
};

export type Require = {
  id: string;
  name: string;
};

export type ListRequire = {
  key: string;
  id: string;
  name: string;
  time: string;
  registrant: string;
  taskCount: string;
  itemCount: string;
};
export type ListAudit = {
  key: string;
  id: string;
  auditor: string;
  reputation: string;
  result: string;
  time: string;
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

export type OwnAssetsCard = {
  name: string;
  symbol: string;
  decimals: string;
  icon: React.ReactElement;
  balance: ethers.BigNumber | string;
  type: string;
  issuser: string;
  address: string;
  tokenId: string;
};

export type OwnOthersCard = {
  title: string;
  detail: string;
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  label3: string;
  value3: string;
  icon: React.ReactElement;
  fn1Name: string;
  fn1: () => void;
  fn2Name: string;
  fn2: () => void;
};

export type OwnTaskCard = {
  platform: string;
  source: string;
  taskId: string;
  boxId: string;
  state: string;
};

export type OwnItemCard = {
  id: string;
  source: string;
  taskId: string;
  boxId: string;
  state: string;
  payment: string;
};

export type OwnAuditCard = {
  itemId: string;
  taskId: string;
  boxId: string | null;
  source: string;
  result: string;
  state: string;
  payment: string;
};

export type PersonalPageData = {
  zimu: ethers.BigNumber;
  vt0: ethers.BigNumber;
  vt1: ethers.BigNumber;
  needed: ethers.BigNumber;
};
