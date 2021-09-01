const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String
    }
  }
);

// add plugin that converts mongoose to json
// Check if web editor works
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if category is taken
 * @param {string} name - The category name
 * @param {ObjectId} [excludeCategoryId] - The id of the category to be excluded
 * @returns {Promise<boolean>}
 */
 categorySchema.statics.isCategoryTaken = async function (name, excludeCategoryId) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
  return !!category;
};

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
