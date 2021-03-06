const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
    trim: true,
  },
  lon: {
    type: Number,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  upvotes: {
    type: Number,
    required: true,
    trim: true,
  },
  downvotes: {
    type: Number,
    required: true,
    trim: true,
  },
  pinType: {
    type: String,
    enum: ["STUDY", "ART", "DINING", "NONE"],
    default: "NONE",
    trim: true,
  },
  indoor: {
    type: Boolean,
    required: true,
    trim: true,
  },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = pinSchema;
