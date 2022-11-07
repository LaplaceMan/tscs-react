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
    subtitleId: number;
    attitude: number;
    auditor: string;
};