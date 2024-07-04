const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

// All events will be stored inside this array (in memory).
const storedEvents = [];

app.post("/events", (req, res) => {
  // Get the event.
  const event = req.body; // we dont know what is inside the event(body) but we will just use it.

  storedEvents.push(event);

  // Now that we have the event, we will make  our series of post requests to our other running services.
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    // reaching out to direct cluster ip services.
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    // reaching out to direct cluster ip service.
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    // reaching out to direct cluster ip service.
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    // reaching out to direct cluster ip services.
    console.log(err.message);
  });
  // Send a success status code.
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(storedEvents);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
