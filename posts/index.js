const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // Will be used to generate an id for each post.

const app = express();

app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
   const id = randomBytes(4).toString('hex'); // 4 bytes of random data. //e.g. k5lk3j4j3jpiapiaj4h
   const { title } = req.body;

   // Add a new id key to the posts object.
   posts[id] = {
      id, title
   };

   res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});