
export type PostTask = {
  amount: string;
  audit: string;
  currency: string;
  deadline: number;
  detection: string;
  payment: string;
  platform: string;
  require: string;
  source: string;
  sourceId: string;
};

export type SubmitItem = {
  taskId: string;
  require: string;
  fingerprint: string;
  cid: string;
};

export type AuditItem = {
  itemId: string;
  attitude: string;
};

export type TokenTransaction = {
  decimals: string;
  type: string;
  address: string;
  tokenId: string;
  operation: string;
};

export type WithdrawReward = {
  platform: string;
  day: string | undefined;
};

export type UpdateTask = {
  taskId: string;
  amount: string;
  extended: string;
};

export type RealTokenTransaction = {
  address: string;
  type: string;
  from: string;
  to: string;
  tokenId: number;
  amount: number;
};

export type GetLockedReward = {
  address: string;
  platform: string;
  day: string;
}

export type ManageDeposit = {
  op: string;
  address: string;
  amount: string;
}

export type PreExtract = {
  payment: string;
  taskId: string;
  boxId: string;
}