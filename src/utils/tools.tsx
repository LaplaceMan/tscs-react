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
