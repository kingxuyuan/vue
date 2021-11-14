import { GetterTree } from 'vuex';
import { SearchState } from './state';
import { RootState } from '../../index';
import {
    ResponseSearchType,
    ResponseSearchKeyWordsTypes,
} from '@/types/api/search';

export type Getters = {
    // 搜索热门标签
    getterSearchHot(state: SearchState): ResponseSearchType;
    // 关键字搜索
    getterSearchKeyWords(state: SearchState): ResponseSearchKeyWordsTypes;
};

export const getters: GetterTree<SearchState, RootState> & Getters = {
    getterSearchHot: (state) => state.searchHot.data,
    getterSearchKeyWords: (state) => state.searchKeyWords.data,
};
