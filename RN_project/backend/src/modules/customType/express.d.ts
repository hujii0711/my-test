// declare module "express" {
// 	export interface Request {
//     	cookies: any;
// 		decoded: {
// 			[key: string]: any;
// 			iss?: string | undefined;
// 			sub?: string | undefined;
// 			aud?: string | string[] | undefined;
// 			exp?: number | undefined;
// 			nbf?: number | undefined;
// 			iat?: number | undefined;
// 			jti?: string | undefined;
// 		},
// 		headers: {
// 			authorization : string
// 		}
// 		tokenUserInfo : {
// 			id: string,
// 			user_id: string
// 		}
// 	}
// }
export {};
declare global {
  namespace Express {
    interface Request {
      cookies: any;
      decoded: {
        [key: string]: any;
        iss?: string | undefined;
        sub?: string | undefined;
        aud?: string | string[] | undefined;
        exp?: number | undefined;
        nbf?: number | undefined;
        iat?: number | undefined;
        jti?: string | undefined;
      };
      headers: {
        authorization: string;
      };
      tokenUserInfo: {
        id: string;
        user_id: string;
        email: string;
      };
    }

    //interface Response {
    //  newToken: string;
    //}
  }
}
