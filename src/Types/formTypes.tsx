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
  applyId: number;
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

export let defaultTokenTransaction = {
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

export let defaultUpdateApplication = {
  payType: "",
  oldAmount: "0",
  oldDeadline: "",
  applyId: "0",
  amount: "0",
  deadline: 0,
  type: "",
};
