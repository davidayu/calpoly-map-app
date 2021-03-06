const mongoose = require("mongoose");
const test = 0;
const commentSchema = require("./comment");
const pinModel = require("./pin");
const dotenv = require("dotenv");

dotenv.config();

let conn;

const uri = process.env.DB_URI;
/*mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));*/

function setConnection(newConn) {
  return (conn = newConn);
}

function getConnection() {
  if (!conn) {
    if (process.argv.includes("--prod")) {
      conn = mongoose.createConnection(
        "mongodb+srv://" +
          process.env.MONGO_USER +
          ":" +
          process.env.MONGO_PWD +
          "@calpolycluster.m4ncq.mongodb.net/" +
          process.env.MONGO_DB +
          "?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    } else {
      conn = mongoose.createConnection("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }
  return conn;
}

async function addComment(comment) {
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    const commentToAdd = await new commentModel(comment);
    const savedComment = await commentToAdd.save();
    return savedComment;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getComments(commentId) {
  let result;
  const commentModel = getConnection().model("Comment", commentSchema);
  if (commentId === undefined) {
    result = await commentModel.find();
  } else {
    result = await findCommentById(commentId);
  }
  return result;
}

async function findCommentById(id) {
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    return await commentModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removeComment(id) {
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    return await commentModel.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function upvoteComment(id, offset) {
  let result;
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    result = await commentModel.findById(id);
    result.upvotes += offset;
    const newComment = await result.save();
    return newComment;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function downvoteComment(id, offset) {
  let result;
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    result = await commentModel.findById(id);
    result.downvotes += offset;
    const newComment = await result.save();
    return newComment;
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
exports.setConnection = setConnection;
