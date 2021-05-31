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

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload
 */

/**
 * @swagger
 * /upload/single:
 *   post:
 *     summary: Upload single image
 *     description: Everyone can upload.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Upload'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */


 /**
 * @swagger
 * /upload/multiple:
 *   post:
 *     summary: Upload multiple image
 *     description: Everyone can upload.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           multipart/form-data:
 *             schema:
 *                $ref: '#/components/schemas/Upload'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
 