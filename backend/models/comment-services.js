const mongoose = require("mongoose");
const test = 0;
const commentModel = require("./comment");
const pinModel = require("./pin");
const dotenv = require("dotenv").config({ path: "database.env" });

const uri = process.env.DB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function addComment(comment) {
  try {
    const commentToAdd = new commentModel(comment);
    const savedComment = await commentToAdd.save();
    return savedComment;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getComments(commentId) {
  let result;
  if (commentId === undefined) {
    result = await commentModel.find();
  } else {
    result = await findCommentById(commentId);
  }
  return result;
}

async function findCommentById(id) {
  try {
    return await commentModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removeComment(id) {
  return await commentModel.findByIdAndDelete({ _id: id });
}

async function upvoteComment(id) {
  let result;
  try {
    result = await commentModel.findById(id);
    result.upvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function downvoteComment(id) {
  let result;
  try {
    result = await commentModel.findById(id);
    result.downvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.addComment = addComment;
exports.getComments = getComments;
exports.removeComment = removeComment;
exports.findCommentById = findCommentById;
exports.upvoteComment = upvoteComment;
exports.downvoteComment = downvoteComment;
