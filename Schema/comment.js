const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true,
    trim: true
  },
  userId: { //
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
  comment: {
    type: String,
    requird:true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    requird: true,
    unique: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    requird: true,
    unique: true
  }



});

module.exports = mongoose.model("comments", commentSchema);