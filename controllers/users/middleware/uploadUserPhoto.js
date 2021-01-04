const multer = require('multer');
const AppError = require('../../../utilities/AppError');

/* const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/users');
  },
  filename: (req, file, callback) => {
    // user-id-timestamp.extension
    const extension = file.mimetype.split('/')[1];
    callback(null, `user-${req.user.id}-${Date.now()}.${extension}`);
  },
}); */
// stores image as buffer on req.file.buffer (so that we may resize it)
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image'))
    return callback(
      new AppError('Please upload a valid file. File must be an image', 400),
      false
    );
  callback(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload.single('photo');
