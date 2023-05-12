export type Submit = {
  amount: string;
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
  decimals: string;
  type: string;
  address: string;
  tokenId: string;
  operation: string;
};

export type RealUpdateApplictaionTransaction = {
  applyId: string;
  amount: number;
  deadline: number;
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
