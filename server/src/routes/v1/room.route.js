const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRooms'), validate(roomValidation.createRoom), roomController.createRoom)
  .get(roomController.getRooms)

router
  .route('/search')
  .get(roomController.searchRooms)

  router
  .route('/favourite')
  .get(roomController.getFavoriteRooms)

router
  .route('/:roomId')
  .get(validate(roomValidation.getRoom), roomController.getRoom)
  .patch(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(auth('manageRooms'), validate(roomValidation.deleteRoom), roomController.deleteRoom);

router
  .route('/location/:locationId')
  .get(validate(roomValidation.getRoomsByLocation), roomController.getRoomsByLocation)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management and retrieval
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a room
 *     description: Only admins and owners can create rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - maximumGuests
 *               - role
 *               - price
 *               - status
 *               - owner
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: object
 *                 houseNumber: 
 *                   type: string
 *                 city: 
 *                   type: string
 *                 state: 
 *                   type: string
 *                 country: 
 *                   type: string
 *                 fullAddress: 
 *                   type: string
 *               maximumGuests:
 *                  type: integer
 *                  description: Must greater than 0
 *               photos: 
 *                  type: array
 *                  description: array of url string
 *               amenities: 
 *                  type: array
 *                  description: array of ObjectId
 *               price: 
 *                  type: int
 *               status:
 *                  type: string
 *                  enum: [Available, Unavailable]
 *               owner:
 *                  type: string
 *                  description: ObjectId string to refer
 *               location:
 *                  type: string
 *                  description: ObjectId string to refer
 *             example:
 *               name: demo room
 *               description: demo description
 *               address:
 *                  houseNumber: 145
 *                  city: Ho Chi Minh City
 *                  country: Vietnam
 *                  fullAddress: 145 Linh Trung, P. Linh Trung, TP. Thu Duc
 *               maximumGuests: 4
 *               amenities: []
 *               photos: []
 *               price: 1000000
 *               status: Available
 *               owner: 60b4b0d5209f55c67dc298dc
 *               location: 60b4b0e911e1a95eb83d5275
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
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Room name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Room location
 *       - in: query
 *         name: maximumGuests
 *         schema:
 *           type: string
 *         description: Room maximum guests
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/Room'
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
 * /rooms/search:
 *   get:
 *     summary: Search rooms
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: location id
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: location id
 *       - in: query
 *         name: checkin
 *         schema:
 *           type: string
 *         description: check in date - yyyy-MM-dd
 *       - in: query
 *         name: checkout
 *         schema:
 *           type: string
 *         description: check out date - yyyy-MM-dd
 *       - in: query
 *         name: guests
 *         schema:
 *           type: integer
 *         description: minimum guests
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/SearchRoom'
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
 * /rooms/favourite:
 *   get:
 *     summary: Get favourite rooms
 *     tags: [Rooms]
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
 *                     $ref: '#/components/schemas/SearchRoom'
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
 * /rooms/{id}:
 *   get:
 *     summary: Get a room
 *     description: Logged owner can fetch only their own rooms. Only admins can fetch other rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Room'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a room
 *     description: Logged owner can fetch only their own rooms. Only admins can fetch other rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: object
 *                 houseNumber: 
 *                   type: string
 *                 city: 
 *                   type: string
 *                 state: 
 *                   type: string
 *                 country: 
 *                   type: string
 *                 fullAddress: 
 *                   type: string
 *               maximumGuests:
 *                  type: integer
 *                  description: Must greater than 0
 *               photos: 
 *                  type: array
 *                  description: array of url string
 *               amenities: 
 *                  type: array
 *                  description: array of ObjectId
 *               price: 
 *                  type: int
 *               status:
 *                  type: string
 *                  enum: [Available, Unavailable]
 *               owner:
 *                  type: string
 *                  description: ObjectId string to refer
 *               location:
 *                  type: string
 *                  description: ObjectId string to refer
 *             example:
 *               name: demo room
 *               description: demo description
 *               address:
 *                  houseNumber: 145
 *                  city: Ho Chi Minh City
 *                  country: Vietnam
 *                  fullAddress: 145 Linh Trung, P. Linh Trung, TP. Thu Duc
 *               maximumGuests: 4
 *               amenities: []
 *               photos: []
 *               price: 1000000
 *               status: Available
 *               owner: 60b4b0d5209f55c67dc298dc
 *               location: 60b4b0e911e1a95eb83d5275
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Room'
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
 *     summary: Delete a room
 *     description: Logged in owner can delete only their rooms. Only admins can delete other rooms.
 *     tags: [Rooms]
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
 * /rooms/location/{locationId}:
 *   get:
 *     summary: Get rooms by location
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         description: LocationId
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