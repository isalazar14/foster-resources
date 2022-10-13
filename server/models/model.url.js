const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  url: {
    type: String,
		required: true,
    match:
      /^(https?:\/\/(?:www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  },
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
