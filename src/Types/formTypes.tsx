export type Submit = {
  amount: number;
  platform: string;
  deadline: number;
  language: number;
  source: string;
  strategy: number;
  videoId: number;
};

export type Upload = {
  applyId: string;
  language: number;
  fingerprint: string;
  cid: string;
};

export type Audit = {
  subtitleId: string;
  attitude: number;
  auditor: string;
};

export type TokenTransaction = {
  name: string;
  symbol: string;
  decimals: number;
  type: string;
  address: string;
  from: string;
  tokenId: string;
  amount: string;
  operation: string;
};

export const defaultTokenTransaction = {
  name: "",
  symbol: "",
  decimals: 0,
  type: "",
  address: "",
  from: "",
  tokenId: "",
  amount: "",
  operation: "",
};

export type UpdateApplication = {
  payType: string;
  oldAmount: string;
  oldDeadline: string;
  applyId: string;
  amount: string;
  deadline: number;
  type: string;
};

export const defaultUpdateApplication = {
  payType: "",
  oldAmount: "0",
  oldDeadline: "",
  applyId: "0",
  amount: "0",
  deadline: 0,
  type: "",
};

export type RealUpdateApplictaionTransaction = {
  applyId: string;
  amount: number;
  deadline: number;
  type: string;
};

export type RealWithdrawRewardTransaction = {
  platform: string;
  day: number;
};

export type RealTokenTransaction = {
  address: string;
  type: string;
  from: string;
  to: string;
  tokenId: number;
  amount: number;
};
