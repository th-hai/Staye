const mongoose = require('mongoose');
const moment = require('moment');
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
    totalDays: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number
    },
    payment: {
      type: String,
      enum: ['Manual Bank Transfer', 'Pay In Cash'],
      default: 'Manual Bank Transfer'
    }
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * Check if date is valid
 * @param {Date} from  - Booking start date
 * @param {Date} to  - Booking end date
 * @returns {Boolean} - Check if end date is larger than start date
 */
 bookingSchema.statics.isDateValid = async function (from, to) {
  return moment(to).isAfter(from, 'day')
};

bookingSchema.pre('save', async function (next) {
  const booking = this;
  if (booking) {
    const from = moment(booking.from).utcOffset("+07:00").set({"hour": 12, "minute": 0, "second": 0, "millisecond": "0"})
    const to = moment(booking.to).utcOffset("+07:00").set({"hour": 12, "minute": 0, "second": 0, "millisecond": "0"})
    const totalDays = to.diff(from, 'day')
    booking.from = from,
    booking.to = to,
    booking.totalDays = totalDays
    booking.total = totalDays > 0 ? totalDays * booking.price : booking.price
  }
  next();
});


/**
 * @typedef Booking
 */
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
