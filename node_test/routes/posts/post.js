const express = require('express');
const Post = require('../../models/post');
const sanitizeHtml = require('sanitize-html');
const checkLoggedIn = require('../../lib/customMiddleware/checkLoggedIn');
const router = express.Router();

/*********************************
const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());
*************************************/
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

const getPostById = async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    const err = new Error('잘못된 요청입니다.');
    next(err);
  }

  try {
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      const err = new Error('포스트가 존재하지 않습니다.');
      next(err);
    }
    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
};

const checkOwnPost = (req, res, next) => {
  const tokenUserInfo = req.tokenUserInfo;
  const post = req.post;
  if (tokenUserInfo.username !== post.user) {
    const error = new Error('글을 작성한 사용자가 일치하지 않습니다.');
    next(error);
  }
  next();
};

router.use('/:id', getPostById);

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    const error = new Error('pageIndex는 1이상이어야 합니다.');
    next(error);
  }

  // const { tag, username } = req.query;

  // const query = {
  //   ...(username ? { 'user.username': username } : {}),
  //   ...(tag ? { tags: tag } : {}),
  // };

  try {
    const posts = await Post.findAllPost();
    // const posts = await Post.find(query)
    //   .sort({ _id: -1 })
    //   .limit(10)
    //   .skip((page - 1) * 10)
    //   .lean()
    //   .exec();
    // const postCount = await Post.countDocuments(query).exec(); //현재 조건에 맞는 컬럼(도큐먼트)의 갯수
    // res.set('Last-Page', Math.ceil(postCount / 10));
    res.set('Last-Page', 1); 
    const data = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
    res.status(200).json({
      code: "success",
      message: '포스트 목록이 정상적으로 조회 되었습니다.',
      post : data
    });
  } catch (err) {
    next(err);
  }
});

// 글작성 라우터
router.post('/', checkLoggedIn, async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = await Post.create({
      title: title,
      body: sanitizeHtml(body, sanitizeOption),
      //tags: tags
      user: req.tokenUserInfo.username,
    });

    res.status(200).json({
      code: "success",
      message: '포스트가 정상적으로 저장되었습니다.',
      post
    });
  } catch (err) {
    next(err);
  }
});

// http://localhost:3000/@test/1
// 글 조회, 글 수정, 글 삭제 라우터
router.route('/:id')
  .get(async (req, res, next) => {
    try {
      res.status(200).json({
        code: "success",
        message: '포스트가 정상적으로 조회되었습니다.',
        post : req.post
      });
    } catch (err) {
      next(err);
    }
  })
  .patch(checkOwnPost, async (req, res, next) => {
      const { id } = req.params;
      // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
      const nextData = { ...req.body }; // 객체를 복사하고
      // body 값이 주어졌으면 HTML 필터링
      if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body);
      }
      try {
        const post = await User.update(
          { body: nextData.body },
          { where: { id } }
        );
        if (!post) {
          const err = new Error('수정 도중 에러가 발생하였습니다.');
          next(err);
        }
        res.status(200).json({
          code: "success",
          message: '포스트가 정상적으로 수정되었습니다.',
          post
        });
      } catch (err) {
        next(err);
      }
  }).delete(checkOwnPost, async (req, res, next) => {
      const { id } = req.params;
      try {
        await User.destroy({
          where: { id },
        });
        res.status(200).json({
          code: "success",
          message: '포스트가 정상적으로 삭제되었습니다.',
        });
      } catch (err) {
        next(err);
      }
  });

module.exports = router;

