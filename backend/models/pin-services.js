const dotenv = require("dotenv");
const mongoose = require("mongoose");
const pinSchema = require("./pin");
const commentSchema = require("./comment");

dotenv.config()

const uri = process.env.DB_URI;

let conn;

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

async function addPin(pin) {
  try {
    const pinModel = getConnection().model("Pin", pinSchema);
    const pinToAdd = new pinModel(pin);
    const savedPin = await pinToAdd.save();
    return savedPin;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getPins(lat, lon) {
  let result;
  const pinModel = getConnection().model("Pin", pinSchema);
  if (lat === undefined || lon === undefined) {
    result = await pinModel.find();
  } else {
    result = await findPinByCoords(lat, lon);
  }
  return result;
}

async function findPinByLocation(title) {
  let result;
  const pinModel = getConnection().model("Pin", pinSchema);
  if (title === undefined) {
    result = await pinModel.find();
  } else {
    result = await pinModel.find({ title: new RegExp(title) });
    // result = await pinModel.find({title: {$regex: /mm/}});
  }
  return result;
}

async function findPinByCoords(lat, lon) {
  const pinModel = getConnection().model("Pin", pinSchema);
  return await pinModel.find({ lat: lat, lon: lon });
}

async function findPinById(id) {
  try {
    const pinModel = getConnection().model("Pin", pinSchema);
    return await pinModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removePin(id) {
  const pinModel = getConnection().model("Pin", pinSchema);
  return await pinModel.findByIdAndDelete({ _id: id });
}

async function upvotePin(id) {
  let result;
  try {
    const pinModel = getConnection().model("Pin", pinSchema);
    result = await pinModel.findById(id);
    result.upvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
  return result;
}

async function downvotePin(id) {
  let result;
  try {
    const pinModel = getConnection().model("Pin", pinSchema);
    result = await pinModel.findById(id);
    result.downvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
  return result;
}

async function addCommentToPin(pinID, comment) {
  let pin = await findPinById(pinID);
  try {
    const commentModel = getConnection().model("Comment", commentSchema);
    const commentToAdd = new commentModel(comment);
    const savedComment = await commentToAdd.save();
    pin.comments.push(commentToAdd._id);
    await pin.save();
    return savedComment;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removeCommentFromPin(pinID, commentID) {
  let pin = await findPinById(pinID);
  try {
    pin.comments.pull(commentID);
    const savedPin = await pin.save();
    return savedPin;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getPinComments(id) {
  let pin;
  try {
    const pinModel = getConnection().model("Pin", pinSchema);
    const commentModel = getConnection().model("Comment", commentSchema);
    pin = await pinModel.findById(id).populate("comments");
    return pin.comments;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function filterByType(pinType) {
  let result;
  const pinModel = getConnection().model("Pin", pinSchema);
  if (pinType === undefined) {
    result = await pinModel.find();
  } else {
    result = await pinModel.find({ pinType: pinType });
  }
  return result;
}

exports.setConnection = setConnection;
exports.addPin = addPin;
exports.getPins = getPins;
exports.findPinByCoords = findPinByCoords;
exports.removePin = removePin;
exports.findPinById = findPinById;
exports.findPinByLocation = findPinByLocation;
exports.upvotePin = upvotePin;
exports.downvotePin = downvotePin;
exports.filterByType = filterByType;
exports.addCommentToPin = addCommentToPin;
exports.getPinComments = getPinComments;
exports.removeCommentFromPin = removeCommentFromPin;
