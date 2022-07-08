import { Request, Response, NextFunction, Router } from "express";
import * as TestController from '../../controller/tests/test';

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

// router.route('/sub') //한개 url로 REST 재활용 [ /test/sub ]
//     .get(TestController.getListTests)
//     .post(TestController.insertTests)
//     .put(TestController.updateTests)
//     .delete(TestController.deleteTests)

export default router;
