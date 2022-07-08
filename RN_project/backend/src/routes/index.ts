import { Router } from "express";

import * as TestRouter from './tests/test';
import * as ArticleRouter from './articles/article';
import * as UserRouter from './users/user';

export const router = Router();
export const path = '';

router.use(TestRouter.path, TestRouter.router);
router.use(ArticleRouter.path, ArticleRouter.router);
router.use(UserRouter.path, UserRouter.router);
