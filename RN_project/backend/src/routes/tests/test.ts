import { Request, Response, NextFunction, Router } from "express";
import * as TestController from '../../controller/tests/test';
//import jwt from 'jsonwebtoken';

export const path = '/test';
export const router = Router();

router.use('/', (req:Request, res:Response, next: NextFunction) => {
    console.log("test 라우터 초기 미들웨어");
    next();
});

router.get('/select', TestController.getListTests);
router.post('/insert', TestController.insertTests);
router.put('/update', TestController.updateTests);
router.delete('/delete', TestController.deleteTests);

// router.get('/generateToken',  (req: Request, res: Response, next: NextFunction) => {
//     const payload  = { id: '1', username: '김형준' }; //{ id: '1', username: '김형준' }
//     //const payload = { id, username };
//     const options = { expiresIn: 60 * 60 * 24 * 30 };
//     const token = jwt.sign(payload, "KimHyungJun", options);
//     return res.json({
//         code: 200,
//         message: '토큰이 발급되었습니다',
//         token,
//     });
// });

// router.get('/verifyToken', (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.access_token;
    
//     // 토큰이 없는 경우 다음 미들웨이 진행
//      if (!token) {
//         const payload  = { id: '1', username: '김형준' };//{ id: '1', username: '김형준' }
//         //const payload = { id, username };
//         const options = { expiresIn: 60 * 60 * 24 * 30 };
//         const token = jwt.sign(payload, "KimHyungJun", options);
//         res.cookie('access_token', token, {
//           maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
//           httpOnly: true,
//         });
//         return next();
//      }
  
//     try {
//         console.log("token1=====", token);
//       const decoded = jwt.verify(token, "kimHyungJun");
      
//       console.log("decoded2=====", decoded);
//       res.cookie('access_token', token, {
//         maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
//         httpOnly: true,
//       });

//       //req.tokenUserInfo = {
//       //  id: decoded.id,
//       //  username: decoded.username,
//       //};
//       next();
//     } catch (err) {
//       next(err);
//     }
// });

// router.route('/sub') //한개 url로 REST 재활용 [ /test/sub ]
//     .get(TestController.getListTests)
//     .post(TestController.insertTests)
//     .put(TestController.updateTests)
//     .delete(TestController.deleteTests)

export default router;
