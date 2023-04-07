import { Request, Response, NextFunction, Router } from 'express';
import * as UserController from '../../controller/user/UserController';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.get('/select', UserController.getListUsers);
router.post('/insert', UserController.insertUsers);
router.put('/update', UserController.updateUsers);
router.delete('/delete', UserController.deleteUsers);
router.get('/createUser', UserController.createUser);

export default router;

// router.route('/sub') //한개 url로 REST 재활용 [ /test/sub ]
//     .get(TestController.getListTests)
//     .post(TestController.insertTests)
//     .put(TestController.updateTests)
//     .delete(TestController.deleteTests)
