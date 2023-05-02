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

export type Task = {
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

export const defaultTask: Task = {
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

export type Item = {
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

export const defaultSubtitle: Item = {
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
  taskCount: string;
  userCount: string;
  platformCount: string;
  itemCount: string;
};

export const defaultDashboard = {
  taskCount: "0",
  userCount: "0",
  itemCount: "0",
  platformCount: "0",
};

export type User = {
  id: string;
  reputation: string;
  deposit: string;
  adopted: string;
  join: number;
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

export const defaultUser = {
  id: "",
  reputation: "0",
  deposit: "0",
  adopted: "0",
  join: 0,
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

export type OwnToken = {
  name: string;
  symbol: string;
  decimals: number;
  icon: React.ReactElement;
  balance: ethers.BigNumber;
  type: string;
  issuser: string;
  address: string;
  tokenId: string;
};

export type OwnOther = {
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
