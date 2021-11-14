import { ActionTree, ActionContext } from 'vuex';
import { moviesActionTypes } from './action-types';
import { Mutations } from './mutations';
import { moviesMutationTypes } from './mutation-types';
import { MoviesState } from './state';
import { RootState } from '../../index';
import { getMovies } from '@/api/movies';
import { RequestMoviesType } from '@/types/api/movies';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<MoviesState, RootState>, 'commit'>;
export interface Actions {
    [moviesActionTypes.MOVIES_ACTION](
        { commit }: AugmentedActionContext,
        params: RequestMoviesType,
    ): void;
}

export const actions: ActionTree<MoviesState, RootState> & Actions = {
    [moviesActionTypes.MOVIES_ACTION]({ commit, state }, params) {
        commit(moviesMutationTypes.MOVIES_MUTATION, {
            loading: true,
            noResult: false,
            data: {
                ...state.movies.data,
            },
        });

        getMovies(params).then((res: any) => {
            const { code, data } = res;
            if (code === 0 && data?.list?.length > 0) {
                commit(moviesMutationTypes.MOVIES_MUTATION, {
                    ...state.movies,
                    loading: false,
                    noResult: false,
                    data: {
                        list: [...state.movies.data.list, ...data.list],
                    },
                });
            } else {
                commit(moviesMutationTypes.MOVIES_MUTATION, {
                    ...state.movies,
                    loading: false,
                    noResult: true,
                });
            }
        });
    },
};
