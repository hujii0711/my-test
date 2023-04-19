const { catchAsync } = require("../error");
const AuthService = require("../../service/auth/AuthService");
const { ApiError } = require("../../modules/error");
const httpStatus = require("http-status");

/********************************** 
 1. 사용자 토큰 정보 DB에서 조회 방법
 articleRouter.get("/article/selectArticle", isLogin, ArticleController.selectArticle);
**********************************/
exports.isLogin = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization ?? "";

  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "요청 헤더에 토큰 정보가 없습니다."
    );
  }

  const result = await AuthService.loginStatus(token);

  if (result.Count === 1) {
    return next();
  } else {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "토큰 조회 과정에서 문제가 발생하였습니다."
    );
  }
});

/********************************** 
 2. 사용자 토큰의 jwt.verify로 검증하는 방법
 jwt.sign시 설정한 expireIn 기준
**********************************/

/********************************** 
 3. passport.req.isAuthenticated()로
 DDB에 사용 설정되는 sessions 테이블
 expires 필드의 TTL(Time To Live)이 만료되어 세션이 삭제된 경우, req.isAuthenticated() 호출은 false를 반환
**********************************/
