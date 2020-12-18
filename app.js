const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
db.sequelize.sync()
  .then(() => {
    console.log('db connection success!');
  })
  .catch(console.error);
passportConfig();

const app = express();

app.use(cors({
  origin: true, // CORS 허용 정책
  // origin: 'http://localhost:3060',
  credentials: true, // 쿠키 전달
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('nodebirdsecret'));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

// app.user((err, req, res, next) => {});

app.listen(3065, () => {
  console.log('server running');
});
