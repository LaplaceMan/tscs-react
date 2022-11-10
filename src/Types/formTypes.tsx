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

export type ApproveTransaction = {
    type: string;
    address: string;
    to: string;
    tokenId: number;
    number: number;
}