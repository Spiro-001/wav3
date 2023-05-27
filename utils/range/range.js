const rangeList = (first, last, direction = 1) => {
  const rangeList = [];
  if (direction === -1) {
    for (let x = last; x >= first; x--) {
      rangeList.push(x);
    }
  } else if (direction === 1) {
    for (let x = first; x <= last; x++) {
      rangeList.push(x);
    }
  }
  return rangeList;
};

export default rangeList;
