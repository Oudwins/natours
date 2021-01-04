module.exports = (obj = {}, filter = []) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (filter.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
