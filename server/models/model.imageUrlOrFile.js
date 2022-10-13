const mongoose = require("mongoose");

const ImageUrlOrFileSchema = new mongoose.Schema({
  url: {
    type: String,
    match:
      /^(https?:\/\/(?:www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  },
  file: Buffer,
});

ImageUrlOrFileSchema.pre("save", function (next) {
  /* is url present */
  if (this.url?.length) {
    /* url AND image file present, reject bc cannot have both */
    if (this.file.byteLength()) {
      this.invalidate(); // needs args
      /* only url present, validation ok */
      next();
    }
    /* ONLY image file present, validation ok */
    if (this.file.byteLength()) next();
    /* Neither url or file upload present, fail validation */
    this.invalidate(); // needs args
  }
});

const ImageUrlOrFile = mongoose.model("ImageUrlOrFile", ImageUrlOrFileSchema);

module.exports = ImageUrlOrFile;
