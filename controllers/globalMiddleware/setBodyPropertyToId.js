module.exports = (bodyProp, reqProp) => {
  return (req, res, next) => {
    req.body[bodyProp] = req[reqProp].id;
    next();
  };
};
