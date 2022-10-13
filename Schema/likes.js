const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

  postId: {
    type: String,
    required: true,
    trim: true
  },
  userId: { //
    type: String,
    required: true,
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
  },



});

module.exports = mongoose.model("likes", likeSchema);