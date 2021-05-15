const httpStatus = require('http-status');
const { Amenity } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a amenity
 * @param {Object} amenityBody
 * @returns {Promise<Amenity>}
 */
const createAmenity = async (amenityBody) => {
  if (await Amenity.isAmenityTaken(amenityBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Amenity is already taken');
  }
  const amenity = await Amenity.create(amenityBody);
  return amenity;
};

/**
 * Query for amenitys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAmenities = async (filter, options) => {
  const amenitys = await Amenity.paginate(filter, options);
  return amenitys;
};

/**
 * Get amenity by id
 * @param {ObjectId} id
 * @returns {Promise<Amenity>}
 */
const getAmenityById = async (id) => {
  return Amenity.findById(id);
};

/**
 * Get user by name
 * @param {string} name
 * @returns {Promise<Amenity>}
 */
const getAmenityByName = async (name) => {
  return Amenity.findOne({ name });
};

/**
 * Update amenity by id
 * @param {ObjectId} amenityId
 * @param {Object} updateBody
 * @returns {Promise<Amenity>}
 */
const updateAmenityById = async (amenityId, updateBody) => {
  const amenity = await getAmenityById(amenityId);
  if (!amenity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Amenity not found');
  }
  if (updateBody && (await Amenity.isAmenityTaken(updateBody.name, amenityId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Amenity is already exists');
  }
  Object.assign(amenity, updateBody);
  await amenity.save();
  return amenity;
};

/**
 * Delete amenity by id
 * @param {ObjectId} amenityId
 * @returns {Promise<Amenity>}
 */
const deleteAmenityById = async (amenityId) => {
  const amenity = await getAmenityById(amenityId);
  if (!amenity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Amenity not found');
  }
  await amenity.remove();
  return amenity;
};

module.exports = {
  createAmenity,
  queryAmenities,
  getAmenityById,
  getAmenityByName,
  updateAmenityById,
  deleteAmenityById,
};
