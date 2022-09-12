import { Request, Response, NextFunction, Router } from "express";
import * as UserController from '../../controller/user/UserController';

export const path = 'user';
export const router = Router();

router.use('/', (req:Request, res:Response, next: NextFunction) => {
    console.log("user 라우터 초기 미들웨어");
    next();
});

router.get('/select', UserController.getListUsers);
router.post('/insert', UserController.insertUsers);
router.put('/update', UserController.updateUsers);
router.delete('/delete', UserController.deleteUsers);

export default router;