export const TimeRemainPercentage = (
  deadline: number,
  duration: number
): number => {
  return ((deadline - new Date().getTime() / 1000) / duration) * 100;
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
