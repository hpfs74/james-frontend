export const getRangeConfig = function (ranges: Array<number>) {
  const rangers = {};
  for (let i = 0; i < ranges.length; ++i) {
    const percentage = Math.ceil((100 / ranges.length) * i);
    if (i < ranges.length - 1) {
      if (i === 0) {
        rangers['min'] = [ranges[i], ranges[i + 1] - ranges[i]];
      } else {
        rangers[percentage + '%'] = [ranges[i], ranges[i + 1] - ranges[i]];
      }
    }
    if (i === ranges.length - 1) {
      rangers['max'] = [ranges[ranges.length - 1]];
    }
  }
  return rangers;
};
