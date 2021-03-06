const httpStatus = require('http-status');
const { Room, Location } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a room
 * @param {Object} roomBody
 * @returns {Promise<Room>}
 */
const createRoom = async (roomBody) => {
  if (await Room.isRoomNameTaken(roomBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name is already taken');
  }
  const room = await Room.create(roomBody);
  return room;
};

/**
 * Query for rooms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRooms = async (filter, options) => {
  const rooms = await Room.paginate(filter, options);
  return rooms;
};

/**
 * Query for rooms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const searchRooms = async (filter, options) => {
  const rooms = await Room.paginate(filter, options);
  return rooms;
};

/**
 * Get room by id
 * @param {ObjectId} id
 * @returns {Promise<Room>}
 */
const getRoomById = async (id) => {
  return Room.findById(id).populate('owner amenities location');
};

/**
 * Get room by id
 * @param {ObjectId} roomId
 * @param {Object} bookedDate
 * @returns {Promise<Room>}
 */
const addBookedDate = async (roomId, bookedDate) => {

  const room = await Room.updateOne({_id: roomId}, {$push: {"bookedDates": bookedDate}});
  return room;
};

/**
 * Get room by id
 * @param {ObjectId} id
 * @returns {Promise<Room>}
 */
const getOwnerByRoom = async (id) => {
  return Room.find({ _id: id }, 'owner -_id')
};

/**
 * Query for rooms by location
 * @param {ObjectId} location - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getRoomsByLocation = async (location) => {
  const rooms = await Room.find({ location: location }, 'name').sort({ name: 1 });
  return rooms;
}

/**
 * Get favourite rooms
 * @param {ObjectId} - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getFavoriteRooms = async () => {
  const rooms = await Room.find({ isFavorite: true }).limit(12);
  return rooms;
}

/**
 * Get room by location id
 * @param {ObjectId} id
 * @returns {Promise<any>}
 */
const getRoomByLocationId = async (id) => {

  const location = await Location.findById(id);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  const totalRooms = await Room.countDocuments({ location: id });
  result = {
    id: id,
    location: location.name,
    thumbnail: location.photo,
    totalRooms: totalRooms
  }

  return result;
};

/**
 * Get room by all location
 * @returns {Promise<any>}
 */
const getRoomByAllLocation = async () => {
  const locations = await Location.find();
  const results = await Promise.all(locations.map(async (location) => {
    const totalRooms = await Room.countDocuments({ location: location._id })
    return ({
      id: location._id,
      location: location.name,
      thumbnail: location.photo,
      totalRooms: totalRooms
    })
  }));

  return results
};

/**
 * Update room by id
 * @param {ObjectId} roomId
 * @param {Object} updateBody
 * @returns {Promise<Room>}
 */
const updateRoomById = async (roomId, updateBody) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  Object.assign(room, updateBody);
  await room.save();
  return room;
};

/**
 * Delete room by id
 * @param {ObjectId} roomId
 * @returns {Promise<Room>}
 */
const deleteRoomById = async (roomId) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  await room.remove();
  return room;
};

module.exports = {
  createRoom,
  queryRooms,
  searchRooms,
  getOwnerByRoom,
  getRoomById,
  getRoomsByLocation,
  getRoomByLocationId,
  getRoomByAllLocation,
  getFavoriteRooms,
  updateRoomById,
  deleteRoomById,
  addBookedDate
};
