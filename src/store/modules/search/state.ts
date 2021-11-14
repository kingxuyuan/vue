import {
    ResponseSearchType,
    ResponseSearchKeyWordsTypes,
    movies_item_types,
} from '@/types/api/search';

// 搜索热门标签
export interface SearchHotStateType {
    // loading: boolean;
    data: ResponseSearchType;
    // noResult: boolean;
}
// 关键字搜索
export interface SearchKeyWordsStateType {
    loading: boolean;
    data: ResponseSearchKeyWordsTypes;
    noResult: boolean;
}

export type SearchState = {
    // 搜索热门标签
    searchHot: SearchHotStateType;
    // 关键字搜索
    searchKeyWords: SearchKeyWordsStateType;
};

export const state: SearchState = {
    searchHot: {
        // loading: false,
        data: {},
        // noResult: false,
    } as SearchHotStateType,
    searchKeyWords: {
        loading: false,
        data: {
            movies: [] as movies_item_types[],
            movie_count: 0,
        },
        noResult: false,
    } as SearchKeyWordsStateType,
};
