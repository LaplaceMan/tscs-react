import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";

export const shortenAddress = (address: string | undefined): string => {
  if (!address || typeof address == undefined) {
    return "None";
  } else {
    if (address.length > 8) {
      return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
    } else {
      return address;
    }
  }
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

export const shortenText = (text: string, len: number): string => {
  if (text.length > len * 2) {
    return `${text.slice(0, len)}...${text.slice(text.length - len)}`;
  } else {
    return text;
  }
};

export const shortenItemContent = (text: string | null): string => {
  if(text) {
    if (text.length > 9) {
      return `${text.slice(0, 4)}...${text.slice(text.length - 2)}`;
    } else {
      return text;
    }
  } else {
    return "";
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
  number: ethers.BigNumber | string | undefined,
  div: string | number,
  fixed: number
) => {
  if (!number || typeof number == undefined) {
    return "None";
  } else {
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
  }
};

export const getGasPriceFixed = (gas: string): string => {
  return Number(gas).toFixed(2).toString();
};

export const personalAssetBalanceOptimize = (balance: string): string => {
  return balance.length > 11 ? balance.slice(0, 10) + "..." : balance;
};

export const antdDateFormat = (value: number | undefined): string => {
  if (typeof value != "number") {
    return "*";
  } else {
    return parseInt((value / 1000).toString()).toString();
  }
};
