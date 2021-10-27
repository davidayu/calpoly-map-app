const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://admin:mapapp@calpolycluster.m4ncq.mongodb.net/myFirstDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// async function findPinById(id) {
//   try {
//     return await pinModel.findById(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

// async function addPin(pin) {
//   try {
//     const pinToAdd = new pinModel(pin);
//     const savedPin = await pinToAdd.save();
//     return savedPin;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// async function findPinByTitle(title) {
//   return await pinModel.find({ title: title });
// }

// async function findPinByLocation(location) {
//   return await pinModel.find({ location: location });
// }

// async function findPinByType(type) {
//   return await pinModel.find({ type: type });
// }

// async function findIndoorPins(indoor) {
//   return await pinModel.find({ indoor: indoor });
// }

// async function findPinByState(indoor) {
//   return await pinModel.find({ pinState: pinState });
// }

// exports.addPin = addPin;
// exports.findPinById = findPinById;
// exports.findPinByTitle = findPinByTitle;
// exports.findPinByLocation = findPinByLocation;
// exports.findPinByType = findPinByType;
// exports.findIndoorPins = findIndoorPins;
// exports.findPinByState = findPinByState;