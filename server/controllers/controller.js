const Resource = require("../models/model.resource");
const Category = require("../models/model.category");

module.exports = {
  getCategoryList: async (req, res) => {
    // console.log("getting category list from db");
    try {
      data = await Category.find({}).sort({
        category: "asc",
        name: "asc",
      });
      // console.log(data, 'sent category list\n')
      // console.log("sent category list\n");
        res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  createCategory: async (req, res) => {
    try {
      data = await Category.create(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  editCategoryById: async (req, res) => {
    try {
      data = await Category.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteCategoryById: async (req, res) => {
    try {
      data = await Category.findOneAndDelete({ _id: req.params.id });
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getResourcesByCategoryId: async (req, res) => {
    console.log("category to match:", req.params.categoryId);
    try {
      data = await Resource.find({ categories: req.params.categoryId })
        .lean()
        .sort({ name: "asc" });
      console.log("found items:", data);
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getAllResources: async (req, res) => {
    try {
      data = await Resource.find({}).sort({ category: "asc", name: "asc" });
      res.json(data);
      // setTimeout(() => {

      // }, 3000);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getResourceById: async (req, res) => {
    try {
      data = await Resource.findOne({ _id: req.params.id });
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getResourcesWithQueryParams: async (req, res) => {
    console.log(req.query);
    let { q: query, limit, offset, orderBy, sortOrder } = req.query;
    let filter = { name: query, description: query };
    let sortOptions = { [orderBy || "name"]: sortOrder == "desc" ? -1 : 1 };

    try {
      data = await Resource.find(
        {}
        // [
        //   { name: q },
        //   { description: q },
        // ], null, {collation: 1}
      )
        // .limit(limit * 1)
        // .skip((page - 1) * limit)
        // .skip(pageNo > 0 ? ( ( pageNo - 1 ) * documentCount) : 0
        .sort(sortOptions)
        .skip(+offset || 0)
        .limit(+limit || 20)
        .populate("categories", "name");
      // .lean()
      console.log(data.length, "items found");
      res.json(data);
      // res.json({
      //   posts,
      //   totalPages: Math.ceil(count / limit),
      //   currentPage: page
      // });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  createResource: async (req, res) => {
    try {
      data = await Resource.create(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  editResourceById: async (req, res) => {
    try {
      data = await Resource.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true,
      });
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteResourceById: async (req, res) => {
    try {
      data = await Resource.findOneAndDelete({ _id: req.params.id });
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
