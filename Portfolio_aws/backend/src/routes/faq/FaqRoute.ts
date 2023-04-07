import { Request, Response, NextFunction, Router } from 'express';
import * as FaqController from '../../controller/faq/FaqController';

export const path = '';
export const router = Router();

router.get('/faq', FaqController.selectListFaq);
router.get('/faq/:id', FaqController.selectFaq);
router.post('/faq/insert/:id', FaqController.insertFaq);
router.patch('/faq/update/:id', FaqController.updateFaq);
router.delete('/faq/delete/:id', FaqController.deleteFaq);
router.patch('/faq/update/prefer/:id', FaqController.updateFaqPrefer);

export default router;
