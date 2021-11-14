import { GetterTree } from 'vuex';
import { MoviesState } from './state';
import { RootState } from '../../index';
import { MoviesStatusType } from './state';

export type Getters = {
    getterMovies(state: MoviesState): MoviesStatusType;
};

export const getters: GetterTree<MoviesState, RootState> & Getters = {
    getterMovies: (state) => state.movies,
};
