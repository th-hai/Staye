const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    address: Joi.string().required(),
    maximumGuests: Joi.number().greater(0).required(),
    photos: Joi.array().items(Joi.string()),
    amenities: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    status: Joi.string().required(),
    isFavorite: Joi.boolean(),
    owner: Joi.string().required().custom(objectId),
    location: Joi.string().required().custom(objectId)
  }),
};

const getRooms = {
  query: Joi.object().keys({
    name: Joi.string(),
    location: Joi.string(),
    maximumGuests: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      address: Joi.string(),
      maximumGuests: Joi.number().greater(0),
      photos: Joi.array().items(Joi.string()),
      amenities: Joi.array().items(Joi.string()),
      price: Joi.number(),
      status: Joi.string(),
      isFavorite: Joi.boolean(),
      owner: Joi.string(),
      location: Joi.string()
    })
    .min(1),
};


const getRoomsByLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  getRoomsByLocation,
  updateRoom,
  deleteRoom,
};
