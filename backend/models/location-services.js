const mongoose = require("mongoose");
const locationModel = require("./location");

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function findLocationByCoords(latitude, longitude) {
  let result;
  if (latitude === undefined && longitude === undefined) {
    result = await userModel.find();
  } else if (latitude && longitufe === undefined) {
    result = await findLocationByLatitude(name);
  } else if (longitude && latitude === undefined) {
    result = await findLocationByLongitude(job);
  } else {
    result = await locationModel.find({
      latitude: latitude,
      longitude: longitude,
    });
  }
  return result;
}

async function findLocationByLatitude(latitude) {
  return await locationModel.find({ latitude: latitude });
}

async function findLocationByLongitude(longitude) {
  return await locationModel.find({ longitude: longitude });
}

async function findLocationByElevation(elevation) {
  return await locationModel.find({ elevation: elevation });
}
