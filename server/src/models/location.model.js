const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    photo: String
  }
);

// add plugin that converts mongoose to json
locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

/**
 * Check if location is taken
 * @param {string} name - The location name
 * @param {ObjectId} [excludeLocationId] - The id of the location to be excluded
 * @returns {Promise<boolean>}
 */
 locationSchema.statics.isLocationTaken = async function (name, excludeLocationId) {
  const location = await this.findOne({ name, _id: { $ne: excludeLocationId } });
  return !!location;
};

/**
 * @typedef Location
 */
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
