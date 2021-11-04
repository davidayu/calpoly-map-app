const mongoose = require("mongoose");
const pinModel = require("./pin");

mongoose
  .connect(
    "mongodb+srv://admin:mapapp@calpolycluster.m4ncq.mongodb.net/myFirstDatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

async function getPins(x, y) {
  let result;
  if (x === undefined || y === undefined) {
    result = await pinModel.find();
  } else {
    result = await findPinByCoords(x, y);
  }
  return result;
}

async function findPinByCoords(x, y) {
  return await pinModel.find({ x: x, y: y});
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

exports.addPin = addPin;
exports.getPins = getPins;
exports.findPinByCoords = findPinByCoords;
exports.removePin = removePin;
exports.findPinById = findPinById;
