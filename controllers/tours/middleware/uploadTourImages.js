const multer = require('multer');
const AppError = require('../../../utilities/AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image'))
    return callback(
      new AppError('Please upload a valid files. Files must be an images', 400),
      false
    );
  callback(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);
