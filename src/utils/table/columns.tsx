import React from "react";
import type { ColumnsType } from "antd/es/table";

interface TaskDataType {
  key: string;
  id: string;
  require: string;
  payment: string;
  currency: string;
  amount: string;
  audit: string;
  detection: string;
  state: string;
}

interface ItemDataType {
  key: string;
  id: string;
  task: string;
  support: string;
  oppose: string;
  state: string;
  source: string;
  fingerprint: string;
}

interface UserDataType {
  key: string;
  id: string;
  reputation: string;
  deposit: string;
  tasks: string;
  items: string;
  audits: string;
}

interface PlatformDataType {
  key: string;
  id: string;
  owner: string;
  authority: string;
  rate1: string;
  rate2: string;
  boxes: string;
}

export const columns: {
  [key: string]: ColumnsType<
    TaskDataType | ItemDataType | UserDataType | PlatformDataType
  >;
} = {
  Tasks: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: "100px",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Reuire",
      dataIndex: "require",
      key: "require",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      width: "100px",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: "120px",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: "150px",
    },
    {
      title: "Audit",
      key: "audit",
      dataIndex: "audit",
      width: "150px",
    },
    {
      title: "Detection",
      key: "detection",
      dataIndex: "detection",
      width: "150px",
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      width: "200px",
      // render: (text: string[]) => text.map((item, index) => <Tag color="#0f0a19" key={index}>{item}</Tag>)
    },
  ],
  Items: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: "100px",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "TaskID",
      dataIndex: "task",
      key: "task",
      width: "100px",
    },
    {
      title: "Support",
      dataIndex: "support",
      key: "support",
      width: "100px",
    },
    {
      title: "Oppose",
      dataIndex: "oppose",
      key: "oppose",
      width: "100px",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: "100px",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: "200px",
    },
    {
      title: "Fingerprint",
      dataIndex: "fingerprint",
      key: "fingerprint",
      width: "200px",
    },
  ],
  Users: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: "100px",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Reputation",
      dataIndex: "reputation",
      key: "reputation",
      width: "150px",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
      width: "150px",
    },
    {
      title: "Post Tasks",
      dataIndex: "tasks",
      key: "tasks",
    },
    {
      title: "Submit Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Audit Items",
      dataIndex: "audits",
      key: "audits",
    },
  ],
  Platforms: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: "100px",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Admin",
      dataIndex: "owner",
      key: "owner",
      width: "150px",
    },
    {
      title: "Authority",
      dataIndex: "authority",
      key: "authority",
      width: "150px",
    },
    {
      title: "Earnings Rate",
      dataIndex: "rate1",
      key: "rate1",
    },
    {
      title: "Share Rate",
      dataIndex: "rate2",
      key: "rate2",
    },
    {
      title: "Boxes",
      dataIndex: "boxes",
      key: "boxes",
      width: "150px",
    },
  ],
};

export const data: TaskDataType[] = [
  {
    key: "1",
    id: "1",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "2",
    id: "2",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "3",
    id: "3",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "4",
    id: "4",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "5",
    id: "5",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "6",
    id: "6",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "7",
    id: "7",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
  {
    key: "8",
    id: "8",
    require: "Translate",
    payment: "OT0",
    currency: "USDT",
    amount: "20.0",
    audit: "0x111.222",
    detection: "0x111.222",
    state: "Normal",
  },
];
