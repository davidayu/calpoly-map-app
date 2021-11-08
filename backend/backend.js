const express = require("express");
const cors = require("cors");
const pinServices = require("./models/pin-services");
const commentServices = require("./models/comment-services");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pins", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  let result = await pinServices.getPins(lat, lon);
  result = { pins_list: result };
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

app.get("/pins/:title", async (req, res) => {
  const title = req.params.title;
  let result = await pinServices.findPinByLocation(title);
  result = { pins_list: result };
  res.send(result);
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

app.get("/comments", async (req, res) => {
  const id = req.query.id;
  let result = await commentServices.getComments(id);
  result = { comment: result };
  res.send(result);
});

app.get("/pins/:title", async (req, res) => {
  const title = req.params.title;
  let result = await pinServices.findPinByLocation(title);
  result = { pins_list: result };
  res.send(result);
});

app.get("/pins/:type", async (req, res) => {
  const pinType = req.params["type"];
  let result = await pinServices.filterByType(pinType);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
