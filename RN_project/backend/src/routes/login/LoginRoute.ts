import { Request, Response, NextFunction, Router } from "express";
import * as LoginController from '../../controller/login/LoginController';
import { isNotLoggedIn } from'../../modules/passport/loginCheck';
export const path = '';
export const router = Router();

router.use('/', (req:Request, res:Response, next: NextFunction) => {
    console.log("login 라우터 초기 미들웨어");
    next();
});

// /auth/local/register | POST | register | 회원가입
// /auth/local | GET | login |  로그인
// /users/me | GET | getLoginStatus | 로그인 상태

router.post('/auth/local/register', LoginController.register);
router.post('/auth/local', isNotLoggedIn, LoginController.login);
router.get('/users/me', LoginController.getLoginStatus);

export default router;
