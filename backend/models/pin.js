const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
    trim: true,
  },
  y: {
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
  pinState: {
    type: String,
    enum: ["NEW", "MINIMIZED", "MAXIMIZED"],
    default: "NEW",
    trim: true,
  },
});

const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
