const httpStatus = require('http-status');
const moment = require('moment');
const { Booking } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a booking
 * @param {Object} bookingBody
 * @returns {Promise<Booking>}
 */
const createBooking = async (bookingBody) => {

  if (await !Booking.isDateValid(bookingBody.from, bookingBody.to)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The booking duration must be at least 1 day');
  }

  if (await roomIsNotAvailable(bookingBody.room ,bookingBody.from, bookingBody.to)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The room is not available at that time');
  }

  const booking = await Booking.create(bookingBody);
  return booking;
};

/**
 * Check if a room is available for booking
 * @param {String} roomId
 * @param {String} from
 * @param {String} to
 * @returns {Promise<Boolean>}
 */
const roomIsNotAvailable = async (roomId, from, to) => {
  const start = moment(from).startOf('day');
  const end = moment(to).endOf("day");

  const room = await Booking.find({
    room: roomId, 
    from: { $gte: start },
    to: { $lte: end }
  })
  
  return room.length > 0  // Gia su room bang 1 tuc la tra ve false con neu bang 0 thi la true
};

/**
 * Query for bookings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBookings = async (filter, options) => {
  const bookings = await Booking.paginate(filter, options);
  return bookings;
};

/**
 * Get booking by id
 * @param {ObjectId} id
 * @returns {Promise<Booking>}
 */
const getBookingById = async (id) => {
  return Booking.findById(id);
};

/**
 * Update booking by id
 * @param {ObjectId} bookingId
 * @param {Object} updateBody
 * @returns {Promise<Booking>}
 */
const updateBookingById = async (bookingId, updateBody) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  Object.assign(booking, updateBody);
  await booking.save();
  return booking;
};

/**
 * Delete booking by id
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
const deleteBookingById = async (bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  await booking.remove();
  return booking;
};

/**
 * Cancel booking by id
 * @param {ObjectId} userId
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
 const cancelBookingById = async (userId, bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  if (userId.toString() !== booking.customer.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This user is unauthorized')
  }
  Object.assign(booking, {status: 'Cancelled'});
  await booking.save();
  return booking;
};

/**
 * Get booking by user id
 * @param {ObjectId} userId
 * @returns {Promise<Booking>}
 */
 const getBookingsByUserId = async (userId) => {
  const populates = { 
    path: 'room customer',
    populate: {
      path: 'owner',
      model: 'User'
    } 
  }
  const booking = await Booking.find({customer: userId}).populate(populates);
  return booking;
};

/**
 * Get booking by owner id
 * @param {ObjectId} ownerId
 * @returns {Promise<Booking>}
 */
 const getBookingsByOwnerId = async (ownerId) => {
  const populates = { 
    path: 'room customer',
    populate: {
      path: 'owner',
      model: 'User'
    }
  }
  const booking = await Booking.find({owner: ownerId}).populate(populates);
  return booking;
};

module.exports = {
  createBooking,
  queryBookings,
  getBookingById,
  getBookingsByUserId,
  getBookingsByOwnerId,
  updateBookingById,
  deleteBookingById,
  cancelBookingById
};
