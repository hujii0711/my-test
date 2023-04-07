import * as UserService from '../../service/user/UserService';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

export const getListUsers = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const result = await UserService.getListUsers(userInfo);
  res.json(result).status(httpStatus.OK);
});

export const insertUsers = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await UserService.insertUsers(body);

  res.json(result).status(httpStatus.OK);
});

export const updateUsers = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await UserService.updateUsers(body);

  res.json(result).status(httpStatus.OK);
};

export const deleteUsers = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await UserService.deleteUsers(body);

  res.json(result).status(httpStatus.OK);
};

export const createUser = async (req: Request, res: Response) => {
  const result = await UserService.createUser();

  res.json(result).status(httpStatus.OK);
};
