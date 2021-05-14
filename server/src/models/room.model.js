const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const addressSchema = mongoose.Schema(
  {
    houseNumber: String,
    city: String,
    state: String,
    country: String,
    fullAddress: String
  }
)

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    address: addressSchema,
    photos: [{
      type: String,
    }],
    standardGuests: {
      type: Number,
      required: true
    },
    maximumGuests: {
      type: Number,
      required: true
    },
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Available',
      enum: ['Available', 'Not available']
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    location: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Location'
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);

/**
 * @typedef Room
 */
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
