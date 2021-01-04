module.exports = (property, filterObjKey) => {
  return (req, res, next) => {
    if (req[property])
      req.filterObj = { [filterObjKey || property]: req[property].id };
    next();
  };
};
