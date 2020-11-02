module.exports = (string) => {
  return string.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
};
