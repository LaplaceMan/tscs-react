import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";

export const TimeRemainPercentage = (start: number, end: number): number => {
  return ((end - new Date().getTime() / 1000) / (end - start)) * 100;
};

export const shortenAddress = (address: string): string => {
  if (address.length) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
  } else {
    return "";
  }
};

export const shortenId = (id: string): string => {
  if (id.length > 7) {
    const format = ethers.BigNumber.from(id).div("1000000").toString();
    id = parseInt(format).toString() + "M+";
  }
  return id;
};

export const shortenAmount = (amount: string) => {
  let format = "";
  const amountInt = Number(amount);
  if (amountInt > 1000000) {
    format = (amountInt / 1000000).toString();
    amount = parseInt(format).toString() + "M+";
  } else if (amountInt > 10000) {
    format = (amountInt / 10000).toString();
    amount = parseInt(format).toString() + "W+";
  } else if (amountInt > 1000) {
    format = (amountInt / 1000).toString();
    amount = parseInt(format).toString() + "K+";
  }
  return amount;
};

export const shortenCID = (text: string, type: string): string => {
  if (text.length > 0) {
    if (type == "personal") {
      return `${text.slice(0, 6)}...${text.slice(text.length - 6)}`;
    } else if (type == "audit") {
      if (text.length > 46) {
        return `${text.slice(0, 23)}...${text.slice(text.length - 23)}`;
      } else {
        return text;
      }
    } else {
      return "";
    }
  } else {
    return "";
  }
};

export const shortenText = (text: string): string => {
  if (text.length > 12) {
    return `${text.slice(0, 6)}...${text.slice(text.length - 6)}`;
  } else {
    return text;
  }
};

export const timestampToDate = (time: number) => {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  const mounth = date.getMonth() + 1;
  const day = date.getDay();
  return year + "-" + mounth + "-" + day;
};

export const timestamp = (): number => {
  const now = (new Date().getTime() / 1000).toString();
  return parseInt(now);
};

export const timestampToDay = (time: number) => {
  time = parseInt((time / 86400000).toString());
  return time;
};

export const bignumberConvert = (
  number: ethers.BigNumber | string,
  div: string | number,
  fixed: number
) => {
  const format = number.toString();
  if (format != "0") {
    if (div != "0") {
      return BigNumber(format).div(div).toFixed(fixed);
    } else {
      return BigNumber(format).toFixed(fixed);
    }
  } else {
    return format;
  }
};

export const getGasPriceFixed = (gas: string): string => {
  return Number(gas).toFixed(2).toString();
};

export const personalAssetBalanceOptimize = (balance: string): string => {
  return balance.length > 11 ? balance.slice(0, 10) + "..." : balance;
};
