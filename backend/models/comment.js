const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
  versionKey: false
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
