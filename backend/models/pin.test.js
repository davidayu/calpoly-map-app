const mongoose = require("mongoose");
const pinSchema = require("./pin");
const pinServices = require("./pin-services");
const commentSchema = require("./comment");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let pinModel;
let commentModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  commentModel = conn.model("Comment", commentSchema);

  pinModel = conn.model("Pin", pinSchema);

  pinServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyPin = {
    lat: 40,
    lon: 30,
    title: "Performing Arts Center",
    description: "covid tests r here",
    upvotes: 10,
    downvotes: 5,
    pinType: "ART",
    indoor: true,
    pinState: "NEW",
  };
  let result = new pinModel(dummyPin);
  await result.save();

  dummyPin = {
    lat: 50,
    lon: 35,
    title: "yakitutu",
    description: "pretty",
    upvotes: 4,
    downvotes: 3,
    pinType: "NONE",
    indoor: true,
    pinState: "MINIMIZED",
  };
  result = new pinModel(dummyPin);
  await result.save();

  dummyPin = {
    lat: 30,
    lon: 20,
    title: "Architecture graveyard",
    description: "cool lil place",
    upvotes: 23,
    downvotes: 5,
    pinType: "ART",
    indoor: false,
    pinState: "MINIMIZED",
  };
  result = new pinModel(dummyPin);
  await result.save();

  dummyPin = {
    lat: 40,
    lon: 55,
    title: "subway",
    description: "eat fresh",
    upvotes: 23,
    downvotes: 24,
    pinType: "DINING",
    indoor: true,
    pinState: "MAXIMIZED",
  };
  result = new pinModel(dummyPin);
  await result.save();
});

afterEach(async () => {
  await pinModel.deleteMany();
});

test("Fetching all pins", async () => {
  const pins = await pinServices.getPins();
  expect(pins).toBeDefined();
  expect(pins.length).toBeGreaterThan(0);
});

test("Fetching pin by latitude and longitude", async () => {
  const pins = await pinServices.getPins(30, 20);
  const result = pins[0];
  expect(result).toBeDefined();
  expect(result.title).toBe("Architecture graveyard");
  expect(result.description).toBe("cool lil place");
  expect(result.upvotes).toBe(23);
  expect(result.downvotes).toBe(5);
  expect(result.pinType).toBe("ART");
  expect(result.indoor).toBe(false);
  expect(result.pinState).toBe("MINIMIZED");
});

test("Fetching pin by invalid latitude and longitude", async () => {
  const pins = await pinServices.getPins(30, 24);
  expect(pins.length).toBe(0);
});

test("Fetching pin by location", async () => {
  const pins = await pinServices.findPinByLocation("yakitutu");
  const result = pins[0];
  expect(result).toBeDefined();
  expect(result.title).toBe("yakitutu");
  expect(result.description).toBe("pretty");
  expect(result.upvotes).toBe(4);
  expect(result.downvotes).toBe(3);
  expect(result.pinType).toBe("NONE");
  expect(result.indoor).toBe(true);
  expect(result.pinState).toBe("MINIMIZED");
});

test("Fetching pin by invalid location", async () => {
  const pins = await pinServices.findPinByLocation("sfdjk");
  expect(pins.length).toBe(0);
});

test("Fetching pin by type", async () => {
  const pins = await pinServices.filterByType("NONE");
  const result = pins[0];
  expect(result).toBeDefined();
  expect(result.title).toBe("yakitutu");
  expect(result.description).toBe("pretty");
  expect(result.upvotes).toBe(4);
  expect(result.downvotes).toBe(3);
  expect(result.pinType).toBe("NONE");
  expect(result.indoor).toBe(true);
  expect(result.pinState).toBe("MINIMIZED");
});

test("Fetching pin by invalid type", async () => {
  const pins = await pinServices.filterByType("sdjskh");
  expect(pins.length).toBe(0);
});

test("Fetching by valid id and finding", async () => {
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = new pinModel(dummyPin);
  const addedPin = await result.save();
  const foundPin = await pinServices.findPinById(addedPin.id);
  expect(foundPin).toBeDefined();
  expect(foundPin.id).toBe(addedPin.id);
  expect(foundPin.title).toBe(addedPin.title);
  expect(foundPin.description).toBe(addedPin.description);
  expect(foundPin.upvotes).toBe(addedPin.upvotes);
  expect(foundPin.downvotes).toBe(addedPin.downvotes);
  expect(foundPin.pinType).toBe(addedPin.pinType);
  expect(foundPin.indoor).toBe(addedPin.indoor);
  expect(foundPin.pinState).toBe(addedPin.pinState);
});

test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const pin = await pinServices.findPinById(anyId);
  expect(pin).toBeUndefined();
});

test("Fetching by valid id and not finding", async () => {
  const randomId = "6132b9d47cefd0cc1916b6a9";
  const pin = await pinServices.findPinById(randomId);
  expect(pin).toBeNull();
});

test("Deleting a pin by Id -- successful path", async () => {
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = new pinModel(dummyPin);
  const addedPin = await result.save();
  const deleteResult = await pinServices.removePin(addedPin.id);
  expect(deleteResult).toBeTruthy();
});

test("Deleting a pin by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await pinServices.removePin(anyId);
  expect(deleteResult).toBeNull();
});

test("Adding pin -- successful path", async () => {
  const addedPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = await pinServices.addPin(addedPin);
  expect(result).toBeTruthy();
  expect(result.title).toBe(addedPin.title);
  expect(result.description).toBe(addedPin.description);
  expect(result.upvotes).toBe(addedPin.upvotes);
  expect(result.downvotes).toBe(addedPin.downvotes);
  expect(result.pinType).toBe(addedPin.pinType);
  expect(result.indoor).toBe(addedPin.indoor);
  expect(result.pinState).toBe(addedPin.pinState);
  expect(result).toHaveProperty("_id");
});

test("Adding pin -- failure path with invalid id", async () => {
  const dummyPin = {
    _id: "123",
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = await pinServices.addPin(dummyPin);
  expect(result).toBeFalsy();
});

test("Adding pin -- failure path with already taken id", async () => {
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };

  const addedPin = await pinServices.addPin(dummyPin);

  const anotherDummyPin = {
    _id: addedPin.id,
    lat: 25,
    lon: 46,
    title: "econ building",
    description: "wonderful classes as well",
    upvotes: 3,
    downvotes: 2,
    pinType: "STUDY",
    indoor: true,
    pinState: "MINIMIZED",
  };

  const result = await pinServices.addPin(anotherDummyPin);
  expect(result).toBeFalsy();
});

test("Upvote pin", async () => {
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = new pinModel(dummyPin);
  const addedPin = await result.save();
  const upvotedPin = await pinServices.upvotePin(addedPin.id);
  expect(upvotedPin).toBeDefined();
  expect(upvotedPin.id).toBe(addedPin.id);
  expect(upvotedPin.title).toBe(addedPin.title);
  expect(upvotedPin.description).toBe(addedPin.description);
  expect(upvotedPin.upvotes).toBe(35);
  expect(upvotedPin.downvotes).toBe(addedPin.downvotes);
  expect(upvotedPin.pinType).toBe(addedPin.pinType);
  expect(upvotedPin.indoor).toBe(addedPin.indoor);
  expect(upvotedPin.pinState).toBe(addedPin.pinState);
});

test("Downvote pin", async () => {
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = new pinModel(dummyPin);
  const addedPin = await result.save();
  const upvotedPin = await pinServices.downvotePin(addedPin.id);
  expect(upvotedPin).toBeDefined();
  expect(upvotedPin.id).toBe(addedPin.id);
  expect(upvotedPin.title).toBe(addedPin.title);
  expect(upvotedPin.description).toBe(addedPin.description);
  expect(upvotedPin.upvotes).toBe(addedPin.upvotes);
  expect(upvotedPin.downvotes).toBe(24);
  expect(upvotedPin.pinType).toBe(addedPin.pinType);
  expect(upvotedPin.indoor).toBe(addedPin.indoor);
  expect(upvotedPin.pinState).toBe(addedPin.pinState);
});

test("Add comment to pin - successful path", async () => {
  const dummyComment = {
    description: "noice",
    upvotes: 3,
    downvotes: 4,
  };
  const dummyPin = {
    lat: 23,
    lon: 43,
    title: "cs building",
    description: "wonderful classes",
    upvotes: 34,
    downvotes: 23,
    pinType: "STUDY",
    indoor: true,
    pinState: "NEW",
  };
  const result = new pinModel(dummyPin);
  const addedPin = await result.save();
  const addedComment = await pinServices.addCommentToPin(
    addedPin.id,
    dummyComment
  );
  expect(addedComment).toBeDefined();
  expect(addedComment.id).toBe(dummyComment.id);
  expect(addedComment.title).toBe(addedPin.title);
  expect(addedComment.description).toBe(addedPin.description);
});

//BEFORE I IMPLEMENT THIS, I NEED TO KNOW HOW MANY FAILURE PATHS WILL SUFFICE

/*test("Adding comment -- failure path with no description", async () => {
  const dummyComment = {
    description: "hate this place",
  };
  const result = await commentServices.addComment(dummyComment);
  expect(result).toBeFalsy();
});*/
