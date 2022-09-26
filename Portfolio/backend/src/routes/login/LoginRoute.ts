import { Request, Response, NextFunction, Router } from 'express';
import * as LoginController from '../../controller/login/LoginController';
import { isNotLoggedIn, isLoggedIn } from '../../modules/passport/loginCheck';
export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.post('/login/register', LoginController.register);
//router.post('/login/loginAction', isNotLoggedIn, LoginController.login); // 로그인이 되어 있지 않아야 통과
//router.get('/login/logout', isLoggedIn, LoginController.logout); // 로그인이 되어 있어야 통과
router.post('/login/loginAction', LoginController.login); // 로그인이 되어 있지 않아야 통과
router.get('/login/logout', LoginController.logout); // 로그인이 되어 있어야 통과
router.get('/login/status', LoginController.getLoginStatus);

export default router;
