import { Request, Response, NextFunction, Router } from 'express';
import * as LoginController from '../../controller/login/LoginController';
import { isNotLoggedIn, isLoggedIn } from '../../modules/passport/loginCheck';
export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('<<<<<< login 라우터 초기 미들웨어 >>>>>>');
  next();
});

// /login/register | POST | register | 회원가입
// /login/loginAction| GET | login |  로그인
// /login/logout | GET | getLoginStatus | 로그아웃
// /login/status | GET | getLoginStatus | 로그인 상태
router.post('/login/register', LoginController.register);
router.post('/login/loginAction', isNotLoggedIn, LoginController.login); // 로그인이 되어 있지 않아야 통과
router.get('/login/logout', isLoggedIn, LoginController.logout); // 로그인이 되어 있어야 통과
router.get('/login/status', LoginController.getLoginStatus);

export default router;
