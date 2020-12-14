const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('this email is already in use');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 9);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    return res.status(201).send('create success');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
