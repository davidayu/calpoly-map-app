const commentSchema = new mongoose.Schema(
  {
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
  },
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

