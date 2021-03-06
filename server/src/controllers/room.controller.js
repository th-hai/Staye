const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roomService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  res.status(httpStatus.CREATED).send(room);
});

const getRooms = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['location']);
  if(req.query.name) {
    let name = new RegExp(req.query.name, 'i');
    filter = { ...filter, name };
  }
  if(req.query.maximumGuests) {
    const maximumGuests = { $gte: req.query.maximumGuests };
    filter = { ...filter, maximumGuests };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roomService.queryRooms(filter, options);
  res.send(result);
});

const searchRooms = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['location']);
  if(req.query.keyword) {
    let name = new RegExp(req.query.keyword, 'i');
    filter = { ...filter, name };
  }
  if(req.query.guests) {
    const maximumGuests = { $gte: req.query.guests };
    filter = { ...filter, maximumGuests };
  }
  // const selectedDates = { from: req.query.checkin, to: req.query.checkout }
  // if(req.query.checkin && req.query.checkout) {
  //   selectedDates = { from: 2021-08-21, to: 2021-08-23}
  //   bookingDates = [ { from: 2021-08-20, to: 2021-08-22}, { from: 2021-08-23, to: 2021-08-25} ]
  //   filter = { ...filter, maximumGuests };
  // }
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  const fields = 'name maximumGuests price photos address';
  options = { ...options, fields }
  if (!options.sortBy) {
    options = { ...options, sortBy: 'name'}
  }
  const result = await roomService.searchRooms(filter, options);
  // const filterDate = result.filter(room => !room.bookingDates.some(date => {
  //   return moment(date.from) <= moment(selectedDates.from) && moment(selectedDates.from) < moment(date.to) || 
  //   moment(selectedDates.from) <= moment(date.from) && moment(date.from) < moment(selectedDates.to);  
  // }))
  res.send(result);
});

const getRoom = catchAsync(async (req, res) => {
  const room = await roomService.getRoomById(req.params.roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  res.send(room);
});

const getRoomsByLocation = catchAsync(async (req, res) => {
  const rooms = await roomService.getRoomsByLocation(req.params.locationId);

  if (!rooms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  res.send(rooms);
});

const getFavoriteRooms = catchAsync(async (req, res) => {
  const rooms = await roomService.getFavoriteRooms(req.params.locationId);

  if (!rooms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No favourite rooms');
  }
  res.send(rooms);
});

const getRoomByLocation = catchAsync(async (req, res) => {
  
  let rooms;
  
  const locationId = req.params.locationId;
  if (!locationId) {
    rooms = await roomService.getRoomByAllLocation();
  } else {
    rooms = await roomService.getRoomByLocationId(req.params.locationId);
  }

  if (!rooms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  res.send(rooms);
});

const updateRoom = catchAsync(async (req, res) => {
  const room = await roomService.updateRoomById(req.params.roomId, req.body);
  res.send(room);
});

const deleteRoom = catchAsync(async (req, res) => {
  await roomService.deleteRoomById(req.params.roomId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRoom,
  getRooms,
  searchRooms,
  getRoom,
  getRoomsByLocation,
  getRoomByLocation,
  getFavoriteRooms,
  updateRoom,
  deleteRoom,
};
