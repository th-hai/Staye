const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookingValidation = require('../../validations/booking.validation');
const bookingController = require('../../controllers/booking.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createBooking'), validate(bookingValidation.createBooking), bookingController.createBooking)
  .get(auth('manageBookings'), validate(bookingValidation.getBookings), bookingController.getBookings)

router
  .route('/:bookingId')
  .get(auth('manageBookings'), validate(bookingValidation.getBooking), bookingController.getBooking)
  .patch(auth('manageBookings'), validate(bookingValidation.updateBooking), bookingController.updateBooking)
  .delete(auth('manageBookings'), validate(bookingValidation.deleteBooking), bookingController.deleteBooking);

router
  .route('/:bookingId/cancel')
  .get(auth('cancelBooking'), validate(bookingValidation.cancelBooking), bookingController.cancelBooking);

router
  .route('/owners/:ownerId')
  .get(auth('getBookingAsOwner'), validate(bookingValidation.getBookingAsOwner), bookingController.getBookingFromOwnerRooms)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management and retrieval
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     description: Only user can create bookings.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room
 *               - customer
 *               - from
 *               - to
 *               - price
 *             properties:
 *               room:
 *                 type: string
 *                 description: ObjectId to refer
 *               customer:
 *                 type: string
 *                 description: ObjectId to refer
 *               status:
 *                 type: string
 *                 enum: [Cancelled, Hold, Confirmed, Pending]
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: string
 *               payment:
 *                 type: string
 *                 enum: [Manual Bank Transfer, Pay In Cash]
 *             example:
 *               room: 60d78b8e174add2d204e57d6
 *               customer: 60d788e2174add2d204e57d3
 *               from: 1990-05-25T15:54:49.119Z
 *               to: 1990-05-28T15:55:49.119Z
 *               status: Pending
 *               price: 200000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all bookings
 *     description: Only admins can retrieve all bookings.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: room
 *         schema:
 *           type: string
 *         description: Room Id
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *         description: Customer Id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Booking status
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Date from
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         description: Date to
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
 *                     $ref: '#/components/schemas/Booking'
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
 * /bookings/{bookingId}:
 *   get:
 *     summary: Get a booking
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a booking
 *     description: Only admins can update bookings.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *                 description: ObjectId to refer
 *               customer:
 *                 type: string
 *                 description: ObjectId to refer
 *               status:
 *                 type: string
 *                 enum: [Cancelled, Hold, Confirmed, Pending]
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: string
 *               payment:
 *                 type: string
 *                 enum: [Manual Bank Transfer, Pay In Cash]
 *             example:
 *               room: 60d78b8e174add2d204e57d6
 *               customer: 60d788e2174add2d204e57d3
 *               from: 1990-05-25T15:54:49.119Z
 *               to: 1990-05-28T15:55:49.119Z
 *               status: Pending
 *               price: 200000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a booking
 *     description: Only admins can delete booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
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
 * /bookings/{bookingId}/cancel:
 *   get:
 *     summary: Cancel a booking
 *     description: Only logged in user can cancel a booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /bookings/owners/{ownerId}:
 *   get:
 *     summary: Get booking by owner
 *     description: Only logged in owner can view booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */