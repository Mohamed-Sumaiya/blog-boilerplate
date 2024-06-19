const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
   res.send(commentsByPostId[req.params.id] || []) // The id comes from the path. // guard against undefined.
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; // set it as an empty array as it can be undefined by default.
  comments.push({ id: commentId, content});
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
})