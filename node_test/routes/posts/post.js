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

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    const error = new Error('pageIndex는 1이상이어야 합니다.');
    next(error);
  }

  const { tag, username } = req.query;

  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    req.set('Last-Page', Math.ceil(postCount / 10));
    req.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (err) {
    next(err);
  }
});

router.post('/', checkLoggedIn, async (req, res) => {
  const { title, body, tags } = req.body;

  try {
    //await post.save();
    Post.create({
      title: title,
      body: sanitizeHtml(body, sanitizeOption),
      //tags: tags
      userName: req.user,
    });
    req.body = post;
  } catch (e) {
    const err = new Error('글쓰기 도중에 에러가 발생하였습니다.');
    next(err);
  }
});

router.get('/read', (req, res) => {
  req.body = req.post;
});

router.delete(
  '/delete',
  checkLoggedIn,
  (req, res, next) => {
    const user = req.user;
    const post = req.post;
    if (post.user._id.toString() !== user._id) {
      //req.status = 403;
      const error = new Error('삭제 도중 에러가 발생하였습니다.');
      next(error);
    }
    next();
  },
  async (req, res, next) => {
    const { id } = req.params;
    try {
      //await Post.findByIdAndRemove(id).exec();
      await User.destroy({
        where: { id: id },
      });
      //ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/patch',
  checkLoggedIn,
  (req, res, next) => {
    const user = req.user;
    const post = req.post;
    if (post.user._id.toString() !== user._id) {
      const err = new Error('작성한 사용자 정보가 일치하지 않습니다.');
      next(err);
    }
    next();
  },
  async (req, res, next) => {
    const { id } = req.params;
    // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.

    const nextData = { ...req.body }; // 객체를 복사하고
    // body 값이 주어졌으면 HTML 필터링
    if (nextData.body) {
      nextData.body = sanitizeHtml(nextData.body);
    }
    try {
      // const post = await Post.findByIdAndUpdate(id, nextData, {
      //   new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      //   // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      // }).exec();
      const post = await User.update(
        {
          title: '바꿀 내용1',
          body: '바꿀 내용2',
        },
        {
          where: { id: 2 },
        }
      );
      if (!post) {
        const err = new Error('수정 도중 에러가 발생하였습니다.');
        next(err);
      }
      req.body = post;
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const err = new Error('잘못된 요청입니다.');
    next(err);
  }
  try {
    const post = await Post.findOne({
      attributes: ['id'],
      where: {
        id: id,
      },
    });

    if (!post) {
      const error = new Error('포스트가 존재하지 않습니다.');
      next(error);
    }
    //ctx.state.post = post;
    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
});

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

module.exports = router;
