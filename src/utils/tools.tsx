import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";

export const TimeRemainPercentage = (start: number, end: number): number => {
  return ((end - new Date().getTime() / 1000) / (end - start)) * 100;
};

export const getScrollTop = (): number => {
  var scrollTop = 0;

  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }

  return scrollTop;
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
    let format = ethers.BigNumber.from(id).div("1000000").toString();
    id = parseInt(format).toString() + "M+";
  }
  return id;
};

export const shortenAmount = (amount: string) => {
  let format = "";
  let amountInt = Number(amount);
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
  if (text.length) {
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

export const timestampToDate = (time: number) => {
  let date = new Date(time * 1000);
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  let day = date.getDay();
  return year + "-" + mounth + "-" + day;
};

export const bignumberConvert = (
  number: string,
  div: string,
  fixed: number
) => {
  let format = ethers.BigNumber.from(number).toString();
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
