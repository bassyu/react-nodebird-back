const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');
const passportConfig = require('./passport');

db.sequelize.sync()
  .then(() => {
    console.log('db connection success!');
  })
  .catch(console.error);

passportConfig();

const app = express();

app.use(cors({
  origin: '*',
  // credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('server running');
});
