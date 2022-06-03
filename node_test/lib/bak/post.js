const express = require('express');
const router = express.Router();

router.get('/insert', async (req, res) => {
    // /posts/insert
    console.log('posts/insert!!!!!!!!!');
    try {
      const post = await Post.create({
        userName: '김해주',
        title: '김해주_title',
        body: '김해주_body',
      });
  
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  