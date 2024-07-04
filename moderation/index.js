// All this service will do is watch for the CommentCreated event.
// And emit a CommentModerated event.
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  // The event itself will be containedon the req.body because we are receiving all the events as simplae post requests for now.
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      // this event will be emitted to the event-bus.
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }

  res.send({}); // so that the req handler doesnt hang.
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
