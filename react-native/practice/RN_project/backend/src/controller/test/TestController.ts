import { Request, Response } from 'express';
import * as TestService from '../../service/test/TestService';

export const getListTests = async (req: Request, res: Response) => {
	const { id } = req.query;
	const body = await TestService.getListTests(id);

	res.json({
		code: 'success',
		message: '정상적으로 조회 되었습니다.',
		resp: body,
	});
};

export const insertTests = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await TestService.insertTests(body);

	res.json({
		code: 'success',
		message: '정상적으로 저장 되었습니다.',
		resp: result,
	});
};

export const updateTests = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await TestService.updateTests(body);

	res.json({
		code: 'success',
		message: '정상적으로 수정 되었습니다.',
		resp: result,
	});
};

export const deleteTests = async (req: Request, res: Response) => {
	const body = req.body;
	const result = await TestService.deleteTests(body);

	res.json({
		code: 'success',
		message: '정상적으로 삭제 되었습니다.',
		resp: result,
	});
};