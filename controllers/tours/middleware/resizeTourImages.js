const sharp = require('sharp');
const catchAsync = require('../../../utilities/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  const imageCover = req.files.imageCover[0];
  const imagesArr = req.files.images;
  // coverImage
  if (imageCover) {
    const imgFname = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;

    await sharp(imageCover.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(`public/img/tours/${imgFname}`);
    req.body.imageCover = imgFname;
  }
  if (imagesArr) {
    req.body.images = [];

    const promiseImgArr = imagesArr.map(async (image, idx) => {
      const imgName = `tour-${req.params.id}-${Date.now()}-${idx + 1}.jpeg`;

      await sharp(image.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`public/img/tours/${imgName}`);
      req.body.images.push(imgName);
    });
    await Promise.all(promiseImgArr);
  }
  next();
});
