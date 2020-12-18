const express = require('express');
const {
  Post, Comment, Image, User,
} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const data = await Post.findOne({
      where: { id: newPost.id },
      include: [
        { model: Image },
        { model: Comment },
        { model: User },
      ],
    });
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('post not found');
    }
    const data = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
