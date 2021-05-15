const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAmenity = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string()
  })
};

const getAmenities = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAmenity = {
  params: Joi.object().keys({
    amenityId: Joi.string().custom(objectId),
  }),
};

const updateAmenity = {
  params: Joi.object().keys({
    amenityId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      type: Joi.string()
    })
    .min(1),
};

const deleteAmenity = {
  params: Joi.object().keys({
    amenityId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAmenity,
  getAmenities,
  getAmenity,
  updateAmenity,
  deleteAmenity,
};
