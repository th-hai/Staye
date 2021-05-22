const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const uploadController = require('../../controllers/upload.controller')
const upload = require('../../utils/multer')

const router = express.Router();

// Upload a file

router.route('/single')
    .post(auth('uploadImages'), upload.single('file'), uploadController.uploadSingle)

router.route('/multiple')
    .post(auth('uploadImages'), upload.array('files', 8), uploadController.uploadMultiple)

module.exports = router;

