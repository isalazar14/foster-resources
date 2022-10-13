const {Schema, model} = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      unique: true,
      index: {
        type: 'text',
        collation: {
          locale: 'en',
          strength: 1
        }
      },
    },
    description: { type: String },
    imageUrl: {
      type: String,
      required: true
    },
    suggestedDetails: { type: [String] },
    urlFriendlyName: {type: String, unique: true}
  },
  { timestamps: true }
);

const Category = model("Category", CategorySchema, "categories");

module.exports = Category;