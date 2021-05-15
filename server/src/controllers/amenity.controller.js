const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { amenityService } = require('../services');

const createAmenity = catchAsync(async (req, res) => {
  const amenity = await amenityService.createAmenity(req.body);
  res.status(httpStatus.CREATED).send(amenity);
});

const getAmenities = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await amenityService.queryAmenities(filter, options);
  res.send(result);
});

const getAmenity = catchAsync(async (req, res) => {
  const amenity = await amenityService.getAmenityById(req.params.amenityId);
  if (!amenity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  res.send(amenity);
});

const updateAmenity = catchAsync(async (req, res) => {
  const amenity = await amenityService.updateAmenityById(req.params.amenityId, req.body);
  res.send(amenity);
});

const deleteAmenity = catchAsync(async (req, res) => {
  await amenityService.deleteAmenityById(req.params.amenityId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAmenity,
  getAmenities,
  getAmenity,
  updateAmenity,
  deleteAmenity,
};
