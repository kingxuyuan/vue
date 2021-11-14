import { GetterTree } from 'vuex';
import { RootState } from '../../index';

import { PlayerState, StatePlayer, StateGuessLike } from './state';

export type Getters = {
    // 视频详情
    getterPlayer(state: PlayerState): StatePlayer;
    // 猜你喜欢数据
    getterGuessLike(state: PlayerState): StateGuessLike;
};

export const getters: GetterTree<PlayerState, RootState> & Getters = {
    getterPlayer: (state) => state.player,
    getterGuessLike: (state) => state.guessLike,
};
