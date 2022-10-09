import { Router } from 'express';
import * as LoginController from '../../controller/login/LoginController';
import { isNotLoggedIn, isLoggedIn } from '../../modules/passport/loginCheck';
export const path = '';
export const router = Router();

router.post('/auth/register', LoginController.register);
router.post('/auth/login', LoginController.login); // 로그인이 되어 있지 않아야 통과
router.get('/auth/logout', LoginController.logout); // 로그인이 되어 있어야 통과
router.get('/auth/autoLogin', LoginController.logout);
router.get('/auth/status', LoginController.getLoginStatus);

export default router;
