import {
  APIGatewayProxyHandlerV2,
  APIGatewayRequestSimpleAuthorizerHandlerV2WithContext,
} from "aws-lambda";
import { createSigner, createVerifier } from "fast-jwt";
import https from "https";

// authHandler.ts
// 구글 사용자 정보 요청 함수를 사용해 구글 접근 토큰을 처리하는 Lambda 함수를 구현한다.

// 함수 목록(개괄)
// 1. loginGoogle : google 로그인
//  signToken: 토큰 발급
//  Set-Cookie: 쿠키에 토큰 저장

// 2. fetchGoogleUserinfo: 인증
//  authorization: 요청 header의 토큰으로 구글 사용자 정보를 조회한다.

// 3. logout: 로그아웃
//  Set-Cookie: 쿠키에 토큰 만료

// 4. authorize: Lambda 권한 부여자 역할

// 5. grant:

const secretKey = process.env.JWT_SECRET_KEY!;
const oneWeekMillis = 7 * 24 * 60 * 60 * 1000;

//createSigner: JWT를 생성하는 함수
const signToken = createSigner({
  key: secretKey,
  expiresIn: oneWeekMillis,
});

//createVerifier: JWT를 검증하는 함수
const verifyToken = createVerifier({ key: secretKey });

const cookieName = "login";
const adminEmail = process.env.ADMIN_EMAIL;

export const loginGoogle: APIGatewayProxyHandlerV2 = async (event) => {
  const { token } = event.queryStringParameters ?? {};
  if (!token) {
    return { statusCode: 400 };
  }

  const response = await fetchGoogleUserinfo(token);
  if (response.error) {
    return { statusCode: 401 };
  }
  const { email } = response;
  const jwt = signToken({ email, admin: adminEmail === email });
  const expires = new Date(Date.now() + oneWeekMillis).toUTCString();
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `${cookieName}=${jwt}; Path=/; Expires=${expires}; Secure; HttpOnly`,
    },
  };
};

async function fetchGoogleUserinfo(
  token: string
): Promise<{ email: string; error?: string }> {
  const response = await new Promise<string>((resolve, reject) =>
    https
      .request(
        {
          hostname: "www.googleapis.com",
          path: "/oauth2/v3/userinfo",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          let data = "";
          response
            .on("data", (chunk) => (data += chunk))
            .on("error", reject)
            .on("close", () => resolve(data));
        }
      )
      .on("error", reject)
      .end()
  );
  return JSON.parse(response);
}

// 로그인 쿠키를 만효시켜 브라우저에서 삭제하도록 HTTP 헤더를 응답한다.
export const logout: APIGatewayProxyHandlerV2 = async (event) => {
  const epoch = new Date(0).toUTCString();
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `${cookieName}=; Path=/; Expires=${epoch}`,
    },
  };
};

interface AuthorizationContext {
  email: string | null;
  admin: boolean;
}

// lambda 권한 부여자인 authorize함수는 JWT를 검증해 요청을 허가할지 결정한다.
// 이 함수는 글 생성, 수정, 삭제 등 요청될 때 마다 실행되므로 다른 함수보다 더 많이 실행된다.
export const authorize: APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<
  AuthorizationContext // {email: string | null; admin: boolean;}
> = async (event) => {
  try {
    const token = parseTokenFromCookie(event.cookies ?? []);
    const { email, admin } = verifyToken(token) as AuthorizationContext;
    // 검증이 통과하면 로그인한 사용자의 email과 admin(운영여부)를 가진다.

    // JWT 검증시 획득산 페이로드 안의 email과 admin여부를 반환값의 context로 넘겨준다.
    // 이는 추후 실행되는 실제 Lambda 함수 요청 객체(event)의 event.requestContext.authorizer.lambda로 접근할 수 있다.
    return { isAuthorized: admin, context: { email, admin } };
  } catch (error) {
    return { isAuthorized: false, context: { email: null, admin: false } };
  }
};

// 프런트엔드에서 명시적으로 요청해 허가 여부를 획득하는 API이다.
// lambda 권한 부여자인 authorize함수와는 다르게 허가 토큰이 잘못되어도 오류가 발생하지 않고, 인증 정보가 없다는 반환값을
// 반환한다. 하지만 하는 일은 거의 비슷하다. Lambda 권한부여자와 마찬가지로 쿠키에서 허가 토큰을 가져온 후 JWT 검증을 통해
// 획득한 페이로드를 반환한다. 즉, 현재 가지고 있는 허가 정보를 해석하는 API이다. 프런트엔드는 이 API의 결과를 받아
//현재 로그인 상태인지 확인할 때 사용한다.
export const grant: APIGatewayProxyHandlerV2<AuthorizationContext> = async (
  event
) => {
  try {
    return verifyToken(parseTokenFromCookie(event.cookies ?? []));
  } catch (error) {
    return { email: null, admin: false };
  }
};

// cookie-parser 대용: 쿠키를 바로 읽기 쉽도록 파싱
function parseTokenFromCookie(cookies: string[]): string {
  const cookiePrefix = `${cookieName}=`;
  return (
    cookies
      .filter((cookie) => cookie.includes(cookiePrefix))
      .flatMap((cookie) => cookie.split(/;\s*/g))
      .filter((part) => part.startsWith(cookiePrefix))[0]
      ?.substring(cookiePrefix.length) ?? ""
  );
}
