export const TimeRemainPercentage = (
  start: number,
  end: number
): number => {
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
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  } else {
    return "";
  }
};

export const timestampToDate = (time: number) => {
  let date = new Date(time * 1000)
  let year = date.getFullYear()
  let mounth = date.getMonth()
  let day = date.getDay()
  return (year + '-' + mounth + '-' + day)
}
