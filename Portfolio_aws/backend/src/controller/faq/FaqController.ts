import { Request, Response } from 'express';
import * as FaqService from '../../service/faq/FaqService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

export const selectListFaq = catchAsync(async (req: Request, res: Response) => {
  const body = await FaqService.selectListFaq();
  res.json(body).status(httpStatus.OK);
});

export const selectFaq = catchAsync(async (req: Request, res: Response) => {
  const body = await FaqService.selectFaq();
  res.json(body).status(httpStatus.OK);
});

export const insertFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.insertFaq();
  res.json(result).status(httpStatus.OK);
});

export const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.updateFaq();
  res.json(result).status(httpStatus.OK);
});

export const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.deleteFaq();
  res.json(result).status(httpStatus.OK);
});

export const updateFaqPrefer = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.updateFaqPrefer();
  res.json(result).status(httpStatus.OK);
});
