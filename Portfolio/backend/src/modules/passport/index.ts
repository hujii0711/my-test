import passport from 'passport';
import local from './localStrategy';
import { Users } from '../../models/users';
import * as tokenConfig from '../token';

// 전체 과정 요약
// 1. 로그인 요청이 들어옴
// 2. passport.authenticate 메서드 호출 [LoginController.ts]
// 3. 로그인 전략 수행 [localStrategy.ts]
// 4. 로그인 성공 시 사용자 정보 객체와 함께 request.login 호출 [LoginController.ts]
// 5. request.login 메서드가 passport.serializeUser 호출 [index.ts]
// 6. request.session 사용자 아이디만 저장
// 7. 로그인 완료

// 로그인 이후의 과정
// 1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출 [index.ts]
// 2. request.session에 저장된 아이디로 데이터베이스에서 사용자 조회
// 3. 조회된 사용자 정보를 request.user에 저장
// 4. 라우터에서 request.user 객체 사용 가능

const passportConfig = () => {
  passport.serializeUser((user: any, done) => {
    console.log('★★★★★★★★★★★★passport.serializeUser★★★★★★★★★★★★');
    // user에 무엇이 들어 있는지 확인 필요!!!!!
    const { user_id } = user;
    console.log('serializeUser >>>>> user=====', user);
    // dataValues: {
    //   id: 1,
    //   user_id: 'f7d1176a-a503-4b4e-94cd-8d11b8eb990c',
    //   user_name: '김형준',
    //   email: 'fujii0711@daum.net',
    //   password: '$2a$12$pBB97fE44l97Ua32eUEjhuGNd5bNJ4wi2eerkDBGY2NsyrZtEiIPW',
    //   jwt: 'no token',
    //   created_at: 2022-10-03T01:51:12.000Z,
    //   updated_at: 2022-10-03T01:51:12.000Z
    // },

    done(null, user_id);
  });

  passport.deserializeUser(async (user_id: string, done) => {
    console.log('★★★★★★★★★★★★passport.deserializeUser★★★★★★★★★★★★');
    try {
      const users = await Users.findOne({
        attributes: ['id', 'user_id', 'user_name', 'email'],
        where: { user_id },
        raw: true,
      });
      console.log('deserializeUser >>>>> users=====', users);

      // 토큰 정보를 조회해서 users 정보 리턴해줌!!!!!!!!!!!!!!! ----> request.user에 저장
      done(null, users);
    } catch (err) {
      done(err);
    }
  });

  local();
};

export default passportConfig;
