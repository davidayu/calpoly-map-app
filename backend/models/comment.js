const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { collection: "comment-list" }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
