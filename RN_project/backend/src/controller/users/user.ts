import { Request, Response } from 'express';
import * as UserService from '../../service/users/user';

export const getListUsers = async (req: Request, res: Response) => {
	const { id } = req.query;
	const body = await UserService.getListUsers(id);

	res.json({
		code: 'success',
		message: '정상적으로 조회 되었습니다.',
		resp: body,
	});
};

export const insertUsers = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await UserService.insertUsers(body);

	res.json({
		code: 'success',
		message: '정상적으로 저장 되었습니다.',
		resp: result,
	});
};

export const updateUsers = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await UserService.updateUsers(body);

	res.json({
		code: 'success',
		message: '정상적으로 수정 되었습니다.',
		resp: result,
	});
};

export const deleteUsers = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await UserService.deleteUsers(body);

	res.json({
		code: 'success',
		message: '정상적으로 삭제 되었습니다.',
		resp: result,
	});
};