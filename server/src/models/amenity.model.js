const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const amenitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: String,
    type: {
      type: String,
      enum: ['Facilities', 'Kitchen', 'Room', 'Families', 'Other'],
      default: 'Facilities',
      required: true
    }
  }
);

// add plugin that converts mongoose to json
amenitySchema.plugin(toJSON);
amenitySchema.plugin(paginate);

/**
 * Check if amenity is taken
 * @param {string} name - The amenity name
 * @param {ObjectId} [excludeAmenityId] - The id of the amenity to be excluded
 * @returns {Promise<boolean>}
 */
 amenitySchema.statics.isAmenityTaken = async function (name, excludeAmenityId) {
  const amenity = await this.findOne({ name, _id: { $ne: excludeAmenityId } });
  return !!amenity;
};

/**
 * @typedef Amenity
 */
const Amenity = mongoose.model('Amenity', amenitySchema);

module.exports = Amenity;
