const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLocation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    photo: Joi.string()
  })
};

const getLocations = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      photo: Joi.string()
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
