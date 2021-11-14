import {
    ResponsePlayerType,
    ResponseGuessLikeType,
    ResponseBuyMoive,
} from '@/types/api/player';

// 视频详情
export interface StatePlayer {
    data: ResponsePlayerType;
}
// 猜你喜欢数据
export interface StateGuessLike {
    loading: boolean;
    noResult: boolean;
    data: ResponseGuessLikeType;
}

// 购买电影
export interface StateBuyMovie {
    loading: boolean;
    noResult: boolean;
    data: ResponseBuyMoive;
}

export type PlayerState = {
    player: StatePlayer;
    guessLike: StateGuessLike;
};

export const state: PlayerState = {
    player: {
        data: {},
    } as StatePlayer,
    guessLike: {
        loading: false,
        noResult: false,
        data: {
            list: [],
        },
    } as StateGuessLike,
};
