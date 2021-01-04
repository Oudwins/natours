const crypto = require('crypto');

module.exports = () => {
  const token = crypto.randomBytes(10).toString('hex');
  return crypto.createHash('sha256').update(hashedToken).digest('hex');
};
