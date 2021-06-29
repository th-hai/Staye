const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookingService, roomService } = require('../services');

const createBooking = catchAsync(async (req, res) => {
  if (req.user._id != req.body.customer) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
  }
  let body = req.body
  const owner = await roomService.getOwnerByRoom(req.body.room)
  if (owner[0]) {
    const value = owner[0]
    body = {...req.body, owner: value.owner }
  }
  const booking = await bookingService.createBooking(body);
  res.status(httpStatus.CREATED).send(booking);
});

const getBookings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['room', 'customer', 'totalGuests', 'status', 'from', 'to']);
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  const populates = { 
    path: 'room customer',
    populate: {
      path: 'owner',
      model: 'User'
    }
  };
  options = { ...options, populates }
  const result = await bookingService.queryBookings(filter, options);
  res.send(result);
});

const getBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  res.send(booking);
});

const updateBooking = catchAsync(async (req, res) => {
  let body = req.body
  const owner = await roomService.getOwnerByRoom(req.body.room)
  if (owner[0]) {
    const value = owner[0]
    body = {...req.body, owner: value.owner }
  }
  const booking = await bookingService.updateBookingById(req.params.bookingId, body);
  res.send(booking);
});

const deleteBooking = catchAsync(async (req, res) => {
  await bookingService.deleteBookingById(req.params.bookingId);
  res.status(httpStatus.NO_CONTENT).send();
});

const cancelBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.cancelBookingById(req.user._id, req.params.bookingId);
  res.send(booking);
});

const getBookingFromOwnerRooms = catchAsync(async (req, res) => {
  if (req.user.role != "owner") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
  }
  const booking = await bookingService.getBookingsByOwnerId(req.params.ownerId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  res.send(booking);
});

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  getBookingFromOwnerRooms,
  updateBooking,
  deleteBooking,
  cancelBooking
};
