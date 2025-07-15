const KeyCodes = {
  escape: 27,
  enter: 13,
  space: 32,
  arrowDown: 40,
  arrowUp: 38,
  delete: 8,
  tab: 9
};

const isEmptyString = str => {
  return str == null || str.toString().trim().length === 0;
};

const filterList = (dataList, val) =>
  dataList.filter(item => {
    return (
      item.name.toLowerCase().includes(val.toLowerCase()) ||
      item.email.toLowerCase().includes(val.toLowerCase())
    );
  });

export { KeyCodes, isEmptyString, filterList };
