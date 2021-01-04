import camelCase from 'camelcase';

const arrToObject = (keys, fields) => {
  const res = {};
  keys.forEach((key, idx) => {
    res[camelCase(key)] = fields[idx][key];
  });
  return res;
};

export default (
  elements = [],
  callBack,
  endPoint = '/api/v1/users/updateme'
) => {
  let fields = elements.map((el) => {
    return { [el]: document.getElementById(el).value };
  });
  if (fields) fields = arrToObject(elements, fields);
  if (fields) return callBack(fields, endPoint);
};
