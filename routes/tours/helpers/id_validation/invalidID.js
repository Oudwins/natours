module.exports = (res) => {
  return res.status(404).json({
    status: 'fail',
    message: 'Invalid ID',
  });
};
