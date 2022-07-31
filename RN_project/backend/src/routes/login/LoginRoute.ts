import { Request, Response, NextFunction, Router } from "express";
import * as LoginController from "../../controller/login/LoginController";
import { isNotLoggedIn, isLoggedIn } from "../../modules/passport/loginCheck";
import { verifyToken } from "../../modules/token";
export const path = "";
export const router = Router();

router.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("<<<<<< login 라우터 초기 미들웨어 >>>>>>");
  next();
});

// /auth/local/register | POST | register | 회원가입
// /auth/local | GET | login |  로그인
// /auth/local/logout | GET | getLoginStatus | 로그아웃
// /users/me | GET | getLoginStatus | 로그인 상태

router.post("/auth/local/register", LoginController.register);
router.post("/auth/local", isNotLoggedIn, LoginController.login); // 로그인이 되어 있지 않아야 통과
router.get("/auth/local/logout", isLoggedIn, LoginController.logout); // 로그인이 되어 있어야 통과
router.get("/users/me", LoginController.getLoginStatus);

export default router;
