const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // Will be used to generate an id for each post.
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Wire up as a middleware.

const posts = {};

/*Implemented this before we created te qeury service so this is technically unused now. */
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex"); // 4 bytes of random data. //e.g. k5lk3j4j3jpiapiaj4h
  const { title } = req.body;

  // Add a new id key to the posts object.
  posts[id] = {
    id,
    title,
  };

  // Right after we create the new post we can make a post request over to the eventt bus.
  await axios.post("http://event-bus-srv:4005/events", {
    // this will be the actual event.
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

// This middleware will listen for events from the event bus.
app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type); // req.body will be the actual event.

  res.send({}); // just to say that we got the event and that everything is good to go.
});

app.listen(4000, () => {
  console.log("v100");
  console.log("Listening on 4000");
});
