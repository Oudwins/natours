module.exports = (req, res) => {
  // Get Tour by ID from database
  res.status(200).json({
    status: 'success',
    data: {
      message: 'placeholder',
    },
  });
};
