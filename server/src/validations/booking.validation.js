const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBooking = {
  body: Joi.object().keys({
    room: Joi.string().custom(objectId).required(),
    customer: Joi.string().custom(objectId).required(),
    status: Joi.string(),
    from: Joi.date(),
    to: Joi.date().greater(Joi.ref("from")).required(),
    price: Joi.object({
      currency: Joi.string(),
      total: Joi.number()
    }).required(),
    payment: Joi.object({
      method: Joi.string(),
      amount: Joi.number()
    }).required()
  }),
};

const getBookings = {
  query: Joi.object().keys({
    room: Joi.string(),
    customer: Joi.string(),
    status: Joi.string(),
    from: Joi.date(),
    to: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

const updateBooking = {
  params: Joi.object().keys({
    bookingId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      room: Joi.string().custom(objectId),
      customer: Joi.string().custom(objectId),
      status: Joi.string(),
      from: Joi.date(),
      to: Joi.date(),
      price: Joi.object({
        currency: Joi.string(),
        total: Joi.number()
      }),
      payment: Joi.object({
        method: Joi.string(),
        amount: Joi.number()
      })
    })
    .min(1),
};

const deleteBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

const cancelBooking = {
  params: Joi.object().keys({
    bookingId: Joi.required().custom(objectId),
  })
}

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  cancelBooking
};
