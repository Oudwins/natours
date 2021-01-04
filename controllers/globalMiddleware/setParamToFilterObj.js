module.exports = (param, filterObjKey) => {
  return (req, res, next) => {
    if (req.params[param])
      req.filterObj = { [filterObjKey]: req.params[param] };
    next();
  };
};
