const express = require("express");
const cors = require("cors");
const pinServices = require("./models/pin-services");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pins", async (req, res) => {
  const x = req.query.x;
  const y = req.query.y;
  let result = await pinServices.getPins(x, y);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
