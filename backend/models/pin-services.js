const dotenv = require("dotenv").config({ path: "database.env" });
const mongoose = require("mongoose");
const pinModel = require("./pin");

const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function addPin(pin) {
  try {
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
  if (lat === undefined || lon === undefined) {
    result = await pinModel.find();
  } else {
    result = await findPinByCoords(lat, lon);
  }
  return result;
}

async function findPinByLocation(title) {
  let result;
  if (title === undefined) {
    result = await pinModel.find();
  } else {
    result = await pinModel.find({ title: new RegExp(title) });
    // result = await pinModel.find({title: {$regex: /mm/}});
  }
  return result;
}

async function findPinByCoords(lat, lon) {
  return await pinModel.find({ lat: lat, lon: lon });
}

async function findPinById(id) {
  try {
    return await pinModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removePin(id) {
  return await pinModel.findByIdAndDelete({ _id: id });
}

async function upvotePin(id) {
  let result;
  try {
    result = await pinModel.findById(id);
    result.upvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function downvotePin(id) {
  let result;
  try {
    result = await pinModel.findById(id);
    result.downvotes += 1;
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function filterByType(pinType) {
  let result;
  if (pinType === undefined) {
    result = await pinModel.find();
  } else {
    result = await pinModel.find({ pinType: pinType });
  }
  return result;
}

exports.addPin = addPin;
exports.getPins = getPins;
exports.findPinByCoords = findPinByCoords;
exports.removePin = removePin;
exports.findPinById = findPinById;
exports.findPinByLocation = findPinByLocation;
exports.upvotePin = upvotePin;
exports.downvotePin = downvotePin;
exports.filterByType = filterByType;
