const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  file: Buffer,
	required: true
});

const File = mongoose.model("File", FileSchema);

module.exports = File;
