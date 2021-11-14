import request from '../utils/request';
import {
    ResponseAddPlay,
    ResponseBuyMoive,
    PlayerRequestType,
    ResponsePlayerType,
    GuessLikeRequesr,
    ResponseGuessLikeType,
    MovieBuyOrWatchRequestType,
    PlayEndParams,
} from '../types/api/player';
import { AxiosPromise } from 'axios';

// 获取配置
export const getPlayer = (
    params: PlayerRequestType,
): AxiosPromise<ResponsePlayerType> => request.post('/api/movie/play', params);

// 猜你喜欢
export const guessLike = (
    params: GuessLikeRequesr,
): AxiosPromise<ResponseGuessLikeType> =>
    request.post('/api/movie/guess_like', params);

// 观看次数
export const addPlay = (
    params: MovieBuyOrWatchRequestType,
): AxiosPromise<ResponseAddPlay> => request.post('/api/movie/addPlay', params);

// 电影购买
export const buyMovie = (
    params: MovieBuyOrWatchRequestType,
): AxiosPromise<ResponseBuyMoive> =>
    request.post('/api/movie/buy_movie', params);

//统计长视频播放完成

export const playEnd = (params: PlayEndParams) =>
    request.post('/api/movie/playend', params);
