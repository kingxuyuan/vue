import { ResponseMoviesType } from '@/types/api/movies';

export interface MoviesStatusType {
    data: ResponseMoviesType;
    loading: boolean;
    noResult: boolean;
}

export type MoviesState = {
    movies: MoviesStatusType;
};

export const state: MoviesState = {
    movies: {
        data: {
            list: [],
        },
        loading: false,
        noResult: false,
    } as MoviesStatusType,
};
