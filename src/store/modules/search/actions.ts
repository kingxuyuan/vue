import { ActionTree, ActionContext } from 'vuex';
import { searchActionTypes } from './action-types';
import { Mutations } from './mutations';
import { searchMutationTypes } from './mutation-types';
import { SearchState } from './state';
import { RootState } from '../../index';
import { searchHot, searchKeyWords } from '@/api/search';
import { RequestTypes } from '@/types/api/search';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SearchState, RootState>, 'commit'>;
export interface Actions {
    // 搜索热门标签
    [searchActionTypes.SEARCH_HOT_ACTION]({
        commit,
    }: AugmentedActionContext): void;
    // 关键字搜索
    [searchActionTypes.SEARCH_KEY_WORDS_ACTION](
        { commit }: AugmentedActionContext,
        data: RequestTypes,
    ): void;
    // 清空搜索的数据
    [searchActionTypes.CLEARN_SEARCH_KEY_ACTION]({
        commit,
    }: AugmentedActionContext): void;
}

export const actions: ActionTree<SearchState, RootState> & Actions = {
    // 搜索热门标签
    [searchActionTypes.SEARCH_HOT_ACTION]({ commit, state }) {
        searchHot().then((res: any) => {
            commit(searchMutationTypes.SEARCH_HOT_MUTATION, {
                // loading: false,
                data: res.data || {},
                // noResult: Object.keys(res).length === 0,
            });
        });
    },
    // 关键字搜索
    [searchActionTypes.SEARCH_KEY_WORDS_ACTION]({ commit, state }, params) {
        commit(searchMutationTypes.SEARCH_KEY_WORDS_MUTATION, {
            loading: true,
            noResult: false,
            data: { ...state.searchKeyWords.data },
        });

        searchKeyWords(params).then((res: any) => {
            const { code, data } = res;
            if (code === 0 && data?.movies.length > 0) {
                commit(searchMutationTypes.SEARCH_KEY_WORDS_MUTATION, {
                    loading: false,
                    noResult: false,
                    data: {
                        ...state.searchKeyWords.data,
                        movies: [
                            ...state.searchKeyWords.data.movies,
                            ...data.movies,
                        ],
                        movie_count: data.movie_count,
                    },
                });
            } else {
                commit(searchMutationTypes.SEARCH_KEY_WORDS_MUTATION, {
                    loading: false,
                    noResult: true,
                    data: { ...state.searchKeyWords.data },
                });
            }
        });
    },
    // 清空搜索的数据
    [searchActionTypes.CLEARN_SEARCH_KEY_ACTION]({ commit, state }) {
        commit(searchMutationTypes.CLEARN_SEARCH_KEY_ACTION);
    },
};
