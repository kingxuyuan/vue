import { MutationTree } from 'vuex';
import { SearchState } from './state';
import { searchMutationTypes } from './mutation-types';
import { SearchHotStateType, SearchKeyWordsStateType } from './state';
import { ResponseSearchKeyWordsTypes } from '@/types/api/search';

export type Mutations<S = SearchState> = {
    // 搜索热门标签
    [searchMutationTypes.SEARCH_HOT_MUTATION](
        state: S,
        searchHot: SearchHotStateType,
    ): void;
    // 关键字搜索
    [searchMutationTypes.SEARCH_KEY_WORDS_MUTATION](
        state: S,
        searchKeyWords: SearchKeyWordsStateType,
    ): void;
    // 清空搜索的数据
    [searchMutationTypes.CLEARN_SEARCH_KEY_ACTION](state: S): void;
};

export const mutations: MutationTree<SearchState> & Mutations = {
    [searchMutationTypes.SEARCH_HOT_MUTATION](
        state: SearchState,
        searchHot: SearchHotStateType,
    ) {
        state.searchHot = searchHot;
    },
    [searchMutationTypes.SEARCH_KEY_WORDS_MUTATION](
        state: SearchState,
        searchKeyWords: SearchKeyWordsStateType,
    ) {
        state.searchKeyWords = searchKeyWords;
    },
    [searchMutationTypes.CLEARN_SEARCH_KEY_ACTION](state: SearchState) {
        state.searchKeyWords.data = {
            ...state.searchKeyWords.data,
            movies: [],
        } as ResponseSearchKeyWordsTypes;
    },
};
