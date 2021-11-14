import { MutationTree } from 'vuex';
import { PlayerState } from './state';
import { playerMutationTypes } from './mutation-types';
import { StatePlayer, StateGuessLike } from './state';

export type Mutations<S = PlayerState> = {
    // 获取视频详情
    [playerMutationTypes.TOGGLE_PLAYER](state: S, player: StatePlayer): void;
    // 猜你喜欢数据
    [playerMutationTypes.TOGGLE_GUESS_LIKE](
        state: S,
        guessLike: StateGuessLike,
    ): void;
};

export const mutations: MutationTree<PlayerState> & Mutations = {
    // 获取视频详情
    [playerMutationTypes.TOGGLE_PLAYER](state: PlayerState, player) {
        state.player = player;
    },
    // 猜你喜欢数据
    [playerMutationTypes.TOGGLE_GUESS_LIKE](state: PlayerState, guessLike) {
        state.guessLike = guessLike;
    },
};
