import { MutationTree } from 'vuex';
import { MoviesState, MoviesStatusType } from './state';
import { moviesMutationTypes } from './mutation-types';

export type Mutations<S = MoviesState> = {
    [moviesMutationTypes.MOVIES_MUTATION](
        state: S,
        movies: MoviesStatusType,
    ): void;

    [moviesMutationTypes.INIT_MOVIES_MUTATION](
        state: S,
        callback?: () => void,
    ): void;
};

export const mutations: MutationTree<MoviesState> & Mutations = {
    [moviesMutationTypes.MOVIES_MUTATION](
        state: MoviesState,
        movies: MoviesStatusType,
    ) {
        state.movies = movies;
    },
    [moviesMutationTypes.INIT_MOVIES_MUTATION](state: MoviesState, callback) {
        state.movies = {
            ...state.movies,
            loading: false,
            noResult: false,
            data: {
                list: [],
            },
        } as MoviesStatusType;
        callback && callback();
    },
};
