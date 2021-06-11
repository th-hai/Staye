const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation');
const locationController = require('../../controllers/location.controller');
const roomController = require('../../controllers/room.controller')

const router = express.Router();

router
  .route('/')
  .post(auth('manageLocations'), validate(locationValidation.createLocation), locationController.createLocation)
  .get(locationController.getLocations)

router
  .route('/:locationId?/rooms')  
  .get(validate(locationValidation.getRoomByLocation), roomController.getRoomByLocation)

router
  .route('/:locationId')
  .get(validate(locationValidation.getLocation), locationController.getLocation)
  .patch(auth('manageLocations'), validate(locationValidation.updateLocation), locationController.updateLocation)
  .delete(auth('manageLocations'), validate(locationValidation.deleteLocation), locationController.deleteLocation);

  
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management and retrieval
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a location
 *     description: Only admins and owners can create location.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     parameters:

 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a location
 *     description: Logged owner can fetch only their own locations. Only admins can fetch other locations.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: location id
 *     responses:
 *       
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a location
 *     description: Logged owner can fetch only their own locations. Only admins can fetch other locations.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: location id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Location'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a location
 *     description: Logged in owner can delete only their locations. Only admins can delete other locations.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /locations/rooms:
 *   get:
 *     summary: Get locations with count rooms
 *     tags: [Locations]
 *    
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *            []
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */