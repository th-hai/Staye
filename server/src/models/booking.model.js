const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Room'
    },
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['Cancelled', 'Hold', 'Confirmed', 'Pending'],
      required: true,
      default: 'Pending'
    },
    from: {
      type: Date,
      default: Date.now,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    price: {
      currency: {
        type: String,
        default: 'VND'
      },
      total: Number
    },
    payment: {
      method: {
        type: String,
        enum: ['Manual Bank Transfer', 'Pay In Cash'],
        default: 'Manual Bank Transfer'
      },
      amount: Number
    }
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * @typedef Booking
 */
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
