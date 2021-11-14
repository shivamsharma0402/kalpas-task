const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
      type: String,
      required: true
  },
  lastname: {
    type: String
  }
});

module.exports = mongoose.model('File', fileSchema);