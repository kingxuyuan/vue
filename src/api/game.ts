/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/request';
import { GameType } from '../types/api/game';
import { AxiosPromise } from 'axios';

// 获取游戏链接
export const getGame = (): AxiosPromise<GameType> =>
    request.post('/api/obinfo/get_token');
