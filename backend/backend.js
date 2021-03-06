const express = require("express");
const cors = require("cors");
const pinServices = require("./models/pin-services");
const commentServices = require("./models/comment-services");
const app = express();
const port = 5000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pins", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const title = req.query.title;
  const pinType = req.query.type;

  if (lat != undefined || lon != undefined) {
    let result = await pinServices.getPins(lat, lon);
    result = { pins_list: result };
    res.send(result);
  } else if (title != undefined) {
    let result = await pinServices.findPinByLocation(title);
    result = { pins_list: result };
    res.send(result);
  } else if (pinType != undefined) {
    let result = await pinServices.filterByType(pinType);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      result = { pins_list: result };
      res.send(result);
    }
  } else {
    let result = await pinServices.getPins();
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      result = { pins_list: result };
      res.send(result);
    }
  }
});

app.get("/pins/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await pinServices.findPinById(id);
  res.send(result);
});

app.post("/pins", async (req, res) => {
  const pin = req.body;
  const savedPin = await pinServices.addPin(pin);
  if (savedPin) {
    res.status(201).send(savedPin);
  } else {
    res.status(500).end();
  }
});

app.delete("/pins/:id", async (req, res) => {
  const id = req.params["id"];
  let pin = await pinServices.findPinById(id);
  if (pin === undefined) res.status(404).send("Pin not found.");
  else {
    await pinServices.removePin(id);
    res.status(204).end();
  }
});

app.patch("/pins/:id/upvotes", async (req, res) => {
  const id = req.params["id"];
  const undo = Boolean(req.query.undo || "");
  const offset = undo ? -1 : 1;
  let pin = await pinServices.findPinById(id);
  if (pin === undefined) res.status(404).send("Pin not found.");
  else {
    await pinServices.upvotePin(id, offset);
    pin = await pinServices.findPinById(id);
    res.status(201).send(pin);
  }
});

app.patch("/pins/:id/downvotes", async (req, res) => {
  const id = req.params["id"];
  const undo = Boolean(req.query.undo || "");
  const offset = undo ? -1 : 1;
  let pin = await pinServices.findPinById(id);
  if (pin === undefined) res.status(404).send("Pin not found.");
  else {
    await pinServices.downvotePin(id, offset);
    pin = await pinServices.findPinById(id);
    res.status(201).send(pin);
  }
});

app.get("/pins/:id/comments", async (req, res) => {
  const id = req.params["id"];
  let result = await pinServices.getPinComments(id);
  try {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send(result);
    }
  } catch (error) {
    res.status(error.response.status);
    return res.send(error.message);
  }
});

app.get("/pins/:pinID/comments/:commentID", async (req, res) => {
  const commentID = req.params["commentID"];
  let comment = await commentServices.findCommentById(commentID);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    res.send(comment);
  }
});

app.post("/pins/:id/comments/", async (req, res) => {
  try {
    const id = req.params["id"];
    const comment = req.body;
    const savedComment = await pinServices.addCommentToPin(id, comment);
    if (savedComment) {
      res.status(201).send(savedComment);
    } else {
      res.status(500).end();
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/pins/:pinID/comments/:commentID", async (req, res) => {
  try {
    const commentID = req.params["commentID"];
    const pinID = req.params["pinID"];
    let comment = await commentServices.findCommentById(commentID);
    if (comment === undefined) res.status(404).send("Comment not found.");
    else {
      await pinServices.removeCommentFromPin(pinID, commentID);
      await commentServices.removeComment(commentID);
      res.status(204).end();
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/comments", async (req, res) => {
  const comment = req.body;
  const savedComment = await commentServices.addComment(comment);
  if (savedComment) {
    res.status(201).send(savedComment);
  } else {
    res.status(500).end();
  }
});

app.delete("/comments/:id", async (req, res) => {
  const id = req.params["id"];
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    await commentServices.removeComment(id);
    res.status(204).end();
  }
});

app.get("/comments/:id", async (req, res) => {
  const id = req.params["id"];
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    res.send(comment);
  }
});

app.get("/comments", async (req, res) => {
  const id = req.query.id;
  let result = await commentServices.getComments(id);
  result = { comments_list: result };
  res.send(result);
});

app.patch("/comments/:id/upvotes", async (req, res) => {
  const id = req.params["id"];
  const undo = Boolean(req.query.undo || "");
  const offset = undo ? -1 : 1;
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    const newComment = await commentServices.upvoteComment(id, offset);
    res.status(201).send(newComment);
  }
});

app.patch("/comments/:id/downvotes", async (req, res) => {
  const id = req.params["id"];
  const undo = Boolean(req.query.undo || "");
  const offset = undo ? -1 : 1;
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    const newComment = await commentServices.downvoteComment(id, offset);
    res.status(201).send(newComment);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
