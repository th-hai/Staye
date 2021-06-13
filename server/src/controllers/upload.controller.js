const cloudinary = require('../utils/cloudinary');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const uploadSingle = catchAsync(async (req, res) => {
  const file = await cloudinary.uploadSingle(req.file.path);
  res.status(httpStatus.CREATED).send(file);
})

const uploadMultiple = catchAsync(async (req, res) => {
  let files = req.files.map(file => new Promise((resolve, reject) => {
    cloudinary.uploadMultiple(file.path).then((result) => {
      resolve(result);
    })
  }))

  Promise.all(files).then(async (result) => {
    res.status(httpStatus.CREATED).send(result);
  })
})

module.exports = {
  uploadSingle,
  uploadMultiple
}