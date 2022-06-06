const express = require('express');
const Post = require('../../models/post');
const sanitizeHtml = require('sanitize-html');
const { checkLoggedIn } = require('../../lib/customMiddleware/tokenConfig');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = express.Router();
//const Joi = require('joi');

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
  if (tokenUserInfo.username !== post.username) {
    const error = new Error('글을 작성한 사용자가 일치하지 않습니다.');
    next(error);
  }
  next();
};

router.use('/:id', getPostById);

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    const err = new Error('pageIndex는 1이상이어야 합니다.');
    next(err);
  }

  const { tag, username } = req.query;
  //req.url====== /api/posts?tag=1231231235
  //req.query========= { tag: '1231231235', username: 'test' }
  try {
    const posts = await Post.findAll({
      offset: (page - 1) * 10,
      limit: 10,
      order: [['id', 'DESC']],
      where: tag
        ? sequelize.where(
            sequelize.fn('JSON_SEARCH', sequelize.col('tags'), 'all', tag),
            {
              [Op.ne]: null,
            }
          )
        : {},
      raw: true,
    });

    // req.query에 tag가 있는 경우
    if (tag) {
      const countAll = await Post.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']],
        //JSON_SEARCH 는 JSON에서 검색 할 때 사용한다. 데이터의 위치를 반환.
        //두 번째 인자로 ‘one’인 경우에는 최초 검색위치, ‘all’인 경우에는 모든위치를 반환한다.
        where: sequelize.where(
          sequelize.fn('JSON_SEARCH', sequelize.col('tags'), 'all', tag),
          {
            [Op.ne]: null,
          }
        ),
        raw: true,
      });
      res.set('Last-Page', countAll.count ? Math.ceil(countAll.count / 10) : 1);
    }

    // req.query에 username 있는 경우
    if (username) {
      const countAll = await Post.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']],
        where: {
          username: {
            [Op.like]: '%' + username + '%',
          },
        },
        raw: true,
      });
      res.set('Last-Page', countAll.count ? Math.ceil(countAll.count / 10) : 1);
    }

    const data = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
    res.status(200).json({
      code: 'success',
      message: '포스트 목록이 정상적으로 조회 되었습니다.',
      resp: data,
    });
  } catch (err) {
    next(err);
  }
});

// 글작성 라우터
router.post('/', checkLoggedIn, async (req, res, next) => {
  // const schema = Joi.object().keys({
  //   title: Joi.string().required(), // required() 가 있으면 필수 항목
  //   body: Joi.string().required(),
  // });

  // const result = await schema.validateAsync(req.body);

  // if (result.error) {
  //   const error = new Error('글 작성 validation을 통과하지 못했습니다.');
  //   next(error);
  // }

  const { title, body, tags } = req.body;

  const _tags = tags.reduce((accVal, curVal) => {
    accVal.push({ key: curVal });
    return accVal;
  }, []);

  try {
    const post = await Post.create({
      title: title,
      body: sanitizeHtml(body, sanitizeOption),
      tags: _tags,
      username: req.tokenUserInfo.username,
    });

    res.status(200).json({
      code: 'success',
      message: '포스트가 정상적으로 저장되었습니다.',
      resp: post,
    });
  } catch (err) {
    next(err);
  }
});

// http://localhost:3000/@test/1
// 글 조회, 글 수정, 글 삭제 라우터
router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      res.status(200).json({
        code: 'success',
        message: '포스트가 정상적으로 조회되었습니다.',
        resp: req.post,
      });
    } catch (err) {
      next(err);
    }
  })
  .patch(checkOwnPost, async (req, res, next) => {
    const { id } = req.params;
    const nextData = { ...req.body }; // 객체를 복사하고

    // body 값이 주어졌으면 HTML 필터링
    if (nextData.body) {
      nextData.body = sanitizeHtml(nextData.body);
    }
    try {
      const update = await Post.update(
        {
          title: nextData.title,
          body: nextData.body,
        },
        { where: { id } }
      );

      if (!update) {
        const err = new Error('수정 도중 에러가 발생하였습니다.');
        next(err);
      }
      res.status(200).json({
        code: 'success',
        message: '포스트가 정상적으로 수정되었습니다.',
        resp: { id, username: req.tokenUserInfo.username },
      });
    } catch (err) {
      next(err);
    }
  })
  .delete(checkOwnPost, async (req, res, next) => {
    const { id } = req.params;
    try {
      await Post.destroy({
        where: { id },
      });
      res.status(200).json({
        code: 'success',
        message: '포스트가 정상적으로 삭제되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
