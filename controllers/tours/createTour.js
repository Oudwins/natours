module.exports = (req, res) => {
  // Handle getting tour from model
  res.status(201).json({
    status: 'success',
    data: {
      tour: 'placeholder',
    },
  });
};
