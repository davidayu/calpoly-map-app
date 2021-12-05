const mongoose = require("mongoose");
const commentSchema = require("./comment");
const commentServices = require("./comment-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
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

  commentServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyComment = {
    description: "awesome",
    upvotes: 45,
    downvotes: 34,
  };
  let result = new commentModel(dummyComment);
  await result.save();

  dummyComment = {
    description: "cool",
    upvotes: 23,
    downvotes: 56,
  };
  result = new commentModel(dummyComment);
  await result.save();

  dummyComment = {
    description: "magnificent",
    upvotes: 236,
    downvotes: 23,
  };
  result = new commentModel(dummyComment);
  await result.save();

  dummyComment = {
    description: "lame",
    upvotes: 42,
    downvotes: 2,
  };
  result = new commentModel(dummyComment);
  await result.save();
});

afterEach(async () => {
  await commentModel.deleteMany();
});

test("Fetching all comments", async () => {
  const comments = await commentServices.getComments();
  expect(comments).toBeDefined();
  expect(comments.length).toBeGreaterThan(0);
});

test("Fetching by valid id and finding", async () => {
  const dummyComment = {
    description: "lovely establishment",
    upvotes: 23,
    downvotes: 5,
  };
  const result = new commentModel(dummyComment);
  const addedComment = await result.save();
  const foundComment = await commentServices.findCommentById(addedComment.id);
  expect(foundComment).toBeDefined();
  expect(foundComment.id).toBe(addedComment.id);
  expect(foundComment.description).toBe(addedComment.description);
  expect(foundComment.upvotes).toBe(addedComment.upvotes);
  expect(foundComment.downvotes).toBe(addedComment.downvotes);
});

test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const comment = await commentServices.findCommentById(anyId);
  expect(comment).toBeUndefined();
});

test("Fetching by valid id and not finding", async () => {
  const randomId = "6132b9d47cefd0cc1916b6a9";
  const comment = await commentServices.findCommentById(randomId);
  expect(comment).toBeNull();
});

test("Deleting a comment by Id -- successful path", async () => {
  const dummyComment = {
    description: "noice",
    upvotes: 3,
    downvotes: 4,
  };
  const result = new commentModel(dummyComment);
  const addedComment = await result.save();
  const deleteResult = await commentServices.removeComment(addedComment.id);
  expect(deleteResult).toBeTruthy();
});

test("Deleting a comment by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await commentServices.removeComment(anyId);
  expect(deleteResult).toBeNull();
});

test("Adding comment -- successful path", async () => {
  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  const result = await commentServices.addComment(dummyComment);
  expect(result).toBeTruthy();
  expect(result.description).toBe(dummyComment.description);
  expect(result.upvotes).toBe(dummyComment.upvotes);
  expect(result.downvotes).toBe(dummyComment.downvotes);
  expect(result).toHaveProperty("_id");
});

test("Adding comment -- failure path with invalid id", async () => {
  const dummyComment = {
    _id: "123",
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  const result = await commentServices.addComment(dummyComment);
  expect(result).toBeFalsy();
});

test("Adding comment -- failure path with already taken id", async () => {
  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  const addedComment = await commentServices.addComment(dummyComment);

  const anotherDummyComment = {
    _id: addedComment.id,
    description: "love this place",
    upvotes: 54,
    downvotes: 23,
  };
  const result = await commentServices.addComment(anotherDummyComment);
  expect(result).toBeFalsy();
});

test("Adding comment -- failure path with no description", async () => {
  const dummyComment = {
    description: "hate this place",
  };
  const result = await commentServices.addComment(dummyComment);
  expect(result).toBeFalsy();
});

test("Upvote comment", async () => {
  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  const addedComment = await commentServices.addComment(dummyComment);
  result = await commentServices.upvoteComment(addedComment.id, 1);

  expect(result.description).toBe(dummyComment.description);
  expect(result.upvotes).toBe(24);
  expect(result.downvotes).toBe(dummyComment.downvotes);
});

test("Upvote comment - nonexistent id", async () => {
  const someId = "6132b9d47cefd0cc1916b6a9";

  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  await commentServices.addComment(dummyComment);
  const result = await commentServices.upvoteComment(someId, 1);

  expect(result).toBeUndefined();
});

test("Downvote comment", async () => {
  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  const addedComment = await commentServices.addComment(dummyComment);
  result = await commentServices.downvoteComment(addedComment.id, 1);

  expect(result.description).toBe(dummyComment.description);
  expect(result.upvotes).toBe(dummyComment.upvotes);
  expect(result.downvotes).toBe(55);
});

test("Downvote comment - nonexistent id", async () => {
  const someId = "6132b9d47cefd0cc1916b6a9";

  const dummyComment = {
    description: "hate this place",
    upvotes: 23,
    downvotes: 54,
  };
  await commentServices.addComment(dummyComment);
  const result = await commentServices.downvoteComment(someId, 1);

  expect(result).toBeUndefined();
});
