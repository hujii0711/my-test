import { clusterCondition, CLUSTER_CODE } from '@modules/cluster';
import logger from '../modules/logger';
import ApiError from '@modules/api.error';
import httpStatus from 'http-status';
import Sequelize, { Op } from 'sequelize';
import { Users } from 'src/models/users';
import { History } from '@models/history';
import { now } from '@modules/util';

/**
 * 유저의 로그정보를 조회한다.
 */
export const getUserHistory = async (login: string, page: number, listSize: number) => {
    logger.info({
        type: 'get',
        message: 'user name',
        data: { login },
    });
	const { rows, count } = await History.findAndCountAll({
        include: [{
            model: Users,
            attributes: ['state', '_id', 'login', 'card_no'],
        }],
        where: {
            login,
            [Op.and]: [
                Sequelize.literal('`User`.`login` = `History`.`login`'),
            ],
        },
		order: [ [ '_id', 'DESC' ] ],
		offset: listSize * (page - 1),
		limit: listSize
	});
	return { list: rows, lastPage: Math.ceil(count / listSize) };
};

/**
 * 카드의 로그정보를 조회한다.
 */
export const getCardHistory = async (id: number, page: number, listSize: number) => {
    logger.info({
        type: 'get',
        message: 'user id',
        data: { id },
    });
	const { rows, count } = await History.findAndCountAll({
        include: [{
            model: Users,
            attributes: ['state', '_id', 'login', 'card_no'],
        }],
        where: {
            card_no: id,
            [Op.and]: [
                Sequelize.literal('`User`.`login` = `History`.`login`'),
            ],
        },
		order: [ [ '_id', 'DESC' ] ],
		offset: listSize * (page - 1),
		limit: listSize
	});
	return { list: rows, lastPage: Math.ceil(count / listSize) };
};

/**
 * 로그정보를 생성한다.
 */
export const createHistory = async (user: Users, type: string): Promise<void> => {
    logger.info({
        type: 'get',
        message: 'create log',
        data: { card_no: user.card_no, _id: user._id },
    });
	const log = await History.create({
        login: user.login,
        card_no: user.card_no,
        type,
        created_at: now().toDate()
    });
	await log.save();
};

/**
 * 클러스터별 로그정보를 조회한다.
 */
export const getCluster = async (clusterType: CLUSTER_CODE, page: number, listSize: number) => {
	if (!CLUSTER_CODE[clusterType]) throw new ApiError(httpStatus.NOT_FOUND, '존재하지 않는 클러스터 코드입니다.');
    logger.info({
        type: 'get',
        message: 'create log',
        data: { cluster: CLUSTER_CODE[clusterType], page },
    });
	const { rows, count } = await History.findAndCountAll({
        include: [{
            model: Users,
            attributes: ['state', '_id', 'login', 'card_no'],
        }],
        where: {
            card_no: clusterCondition[clusterType],
            [Op.and]: [
                Sequelize.literal('`User`.`login` = `History`.`login`'),
            ],
        },
		order: [ [ '_id', 'DESC' ] ],
		offset: listSize * (page - 1),
		limit: listSize
	});
	return { list: rows, lastPage: Math.ceil(count / listSize) };
};

/**
 * 특정 클러스터의 미반납카드를 조회한다.
 */
export const getCheckIn = async (clusterType: CLUSTER_CODE, page: number, listSize: number) => {
	if (!CLUSTER_CODE[clusterType]) throw new ApiError(httpStatus.NOT_FOUND, '존재하지 않는 클러스터 코드입니다.');
    logger.info({
        type: 'get',
        message: 'create log',
        data: { cluster: CLUSTER_CODE[clusterType], page },
    });
	const { rows, count } = await History.findAndCountAll({
        include: [Users],
		where: {
            card_no: clusterCondition[clusterType],
            type: 'checkIn',
			[Op.and]: [
                Sequelize.literal('`History`.`_id` in (SELECT MAX(`_id`) FROM `history` GROUP BY `login`)'),
			],
		},
		order: [ [ '_id', 'DESC' ] ],
		offset: listSize * (page - 1),
		limit: listSize
	});
	return { list: rows, lastPage: Math.ceil(count / listSize) };
};

