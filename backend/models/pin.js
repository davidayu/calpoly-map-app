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
  z: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
