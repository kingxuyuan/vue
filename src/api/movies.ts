import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { RequestMoviesType, ResponseMoviesType } from '../types/api/movies';

// 影视列表
export const getMovies = (
    params: RequestMoviesType,
): AxiosPromise<ResponseMoviesType> =>
    request.post('/api/module/movie_list', params);
