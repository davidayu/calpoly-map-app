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
  const test = 0;
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
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
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

app.put("/pins/upvote/:id", async (req, res) => {
  const id = req.params["id"];
  let pin = await pinServices.findPinById(id);
  if (pin === undefined) res.status(404).send("Pin not found.");
  else {
    await pinServices.upvotePin(id);
    res.status(204).end();
  }
});

app.put("/pins/downvote/:id", async (req, res) => {
  const id = req.params["id"];
  let pin = await pinServices.findPinById(id);
  if (pin === undefined) res.status(404).send("Pin not found.");
  else {
    await pinServices.downvotePin(id);
    res.status(204).end();
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

app.get("/comments", async (req, res) => {
  const id = req.query.id;
  let result = await commentServices.getComments(id);
  result = { comment: result };
  res.send(result);
});

app.put("/comments/upvote/:id", async (req, res) => {
  const id = req.params["id"];
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    await commentServices.upvoteComment(id);
    res.status(204).end();
  }
});

app.put("/comments/downvote/:id", async (req, res) => {
  const id = req.params["id"];
  let comment = await commentServices.findCommentById(id);
  if (comment === undefined) res.status(404).send("Comment not found.");
  else {
    await commentServices.downvoteComment(id);
    res.status(204).end();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
