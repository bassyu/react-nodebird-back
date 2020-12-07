const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('server running');
});
