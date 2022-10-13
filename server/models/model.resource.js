const {Schema, model} = require("mongoose");
const Category = require('./model.category.js')

const ResourceSchema = new Schema({
  // category: { type: String, required: true, enum: ["clothing", "community", "education", "food", "health", "housing", "jobs", "social", "supplies", "misc"], default: "misc" },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: 'Category',
    required: true,
    // unique: true,
    index: {
      type: 'text',
      collation: {
        locale: 'en',
        strength: 1
      }
    },
    // validate: {
    //   validator: async function (categoriesToValidate) {
    //     /** validate all categories submitted as a group */
    //     let matchingCategoriesCount = await (Category.find({_id: categoriesToValidate}).select('name').collation({locale: 'en', strength: 1}).count())
    //     let isValid = categoriesToValidate.length == matchingCategoriesCount;
        
    //     // /** validate each resourceType individually */
    //     // let matchingCategoriesArray = await (ResourceType.find({name: categoriesToValidate}).select('name').collation({locale: 'en', strength: 1}))
    //     // let isValid = categoriesToValidate.map(rt => isValidResourceType(rt, matchingCategoriesArray))
    //     return isValid
    //   },
    //   message: "One or more of the following categories is not an existing resource type: [{VALUE}]."
    // },
  },
  name: { type: String, required: true, minlength: 3, unique: true },
  description: { type: String },
  url: { type: String },
  location: {
    name: { type: String, minlength: 1 },
    description: { type: String, minlength: 1 },
    notes: { type: String, minlength: 1 },
    mapCoord: {
      lat: { type: Number },
      long: { type: Number }
    },
  },
  details: { type: String },
  imageUrl: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Resource = model('Resource', ResourceSchema);

function isValidResourceType(value, validValues) {
  let isValid = validValues.some(rt => rt.toLowerCase() == value.name.toLowerCase());
  return isValid;
  // let isValid = false,
  //   i = 0
  // while (isValid === false) {
  //   if (value.toLowerCase() == validValues[i].name.toLowerCase()) {
  //     isValid = true
  //   }
  // }
  // return isValid
}

module.exports = Resource;