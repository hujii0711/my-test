import { Router } from 'express';

import * as LoginRouter from './login/LoginRoute';
import * as UserRouteer from './users/UserRoute';
import * as ArticleRouter from './article/ArticleRoute';
import * as CommentRouter from './comment/CommentRoute';
import * as ChatRouteter from './chat/ChatRoute';
import * as ErrorRouter from './error/ErrorRoute';

export const router = Router();
export const path = '';

router.use(LoginRouter.path, LoginRouter.router);
router.use(UserRouteer.path, UserRouteer.router);
router.use(ArticleRouter.path, ArticleRouter.router);
router.use(CommentRouter.path, CommentRouter.router);
router.use(ChatRouteter.path, ChatRouteter.router);
router.use(ErrorRouter.path, ErrorRouter.router);
