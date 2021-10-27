const mongoose = require("mongoose");
const comment = require("./comment")

const pinSchema = new mongoose.Schema({
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
  location: 
    [{type: mongoose.Schema.Types.ObjectId,
    ref: "Location"}],
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
    required: true,
    trim: true,
   },
   indoor: {
    type: Boolean,
    required: true,
    trim: true,
   },
   pinState: {
    type: String,
    required: true,
    trim: true,
   },
   comments: [{type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"}],
},
{collection : 'pin-list'});

const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;