const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
// When we receive an event from the event-bus.
 if (type === 'PostCreated') {
   const { id, title } = data;

   posts[id] = { id, title, comments: [] };
 }

 if (type === 'CommentCreated') {
   const { id, content, postId, status } = data;

   const post = posts[postId];
   post.comments.push({ id, content, status });
  // console.log(posts[postId].comments)
 }

 if (type === 'CommentUpdated'){
  const { id, content, postId, status } = data;

  const post = posts[postId];
  const comment = post.comments.find(comment => comment.id === id);

  comment.status = status; 
  comment.content = content; // we dont know what has een updated so just update the entire content property.
 }

}

app.get('/posts', (req, res) => {
   res.send(posts); // just send the entire object.
});

app.post('/events', (req, res) => {
 const { type, data } = req.body;

 handleEvent(type, data);

 res.send({}) // send an empty object just to indicate hat we sent the evnt and processed it.
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    try {
      // Get a list of all the events that has been emitted up to this point in time from th event-bus.
      const response = await axios.get('http://event-bus-srv:4005/events');

      for (let event of response.data) {
      console.log('Processing event:', event.type );

      handleEvent(event.type, event.data);
     }
    } catch (err) {
      console.log(err.message)
    }
})