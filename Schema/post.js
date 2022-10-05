const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    requird:true,
    trim: true
  },
  content: {
    type: String,
    requird:true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    requird: true,
    unique: true
  }


});

module.exports = mongoose.model("posts", postSchema);