import { Router } from 'express';

import * as TestRouter from './test/TestRoute';
import * as ArticleRouter from './article/ArticleRoute';
import * as UserRouter from './users/UserRoute';
import * as LoginRouter from './login/LoginRoute';
import * as CommentRouter from './comment/CommentRoute';
import * as ErrorRouter from './error/ErrorRoute';

export const router = Router();
export const path = '';

router.use(TestRouter.path, TestRouter.router);
router.use(ArticleRouter.path, ArticleRouter.router);
router.use(UserRouter.path, UserRouter.router);
router.use(LoginRouter.path, LoginRouter.router);
router.use(CommentRouter.path, CommentRouter.router);
router.use(ErrorRouter.path, ErrorRouter.router);
