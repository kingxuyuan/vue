import { ActionTree, ActionContext } from 'vuex';
import { playerActionTypes } from './action-types';
import { Mutations } from './mutations';
import { playerMutationTypes } from './mutation-types';
import { PlayerState } from './state';
import { RootState } from '../../index';
import { getPlayer, guessLike } from '@/api/player';
import {
    PlayerRequestType,
    GuessLikeRequesr,
    MovieBuyOrWatchRequestType,
} from '@/types/api/player';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PlayerState, RootState>, 'commit'>;
export interface Actions {
    // 获取视频详情
    [playerActionTypes.GET_PLAYER](
        { commit }: AugmentedActionContext,
        params: PlayerRequestType,
    ): void;
    // 获取猜你喜欢数据
    [playerActionTypes.GET_GUESSLIKE](
        { commit }: AugmentedActionContext,
        params: GuessLikeRequesr,
    ): void;
}

export const actions: ActionTree<PlayerState, RootState> & Actions = {
    // 获取视频详情
    [playerActionTypes.GET_PLAYER]({ commit, state }, params) {
        getPlayer(params).then((res: any) => {
            const { code, data } = res;
            if (code === 0) {
                commit(playerMutationTypes.TOGGLE_PLAYER, {
                    data: data,
                });
            } else {
                commit(playerMutationTypes.TOGGLE_PLAYER, {
                    data: {} as any,
                });
            }
        });
    },
    // 获取猜你喜欢数据
    [playerActionTypes.GET_GUESSLIKE]({ commit, state }, params) {
        commit(playerMutationTypes.TOGGLE_GUESS_LIKE, {
            loading: true,
            noResult: false,
            data: {
                ...state.guessLike.data,
            },
        });
        guessLike(params).then((res: any) => {
            const { code, data } = res;
            if (code === 0 && data?.list?.length > 0) {
                commit(playerMutationTypes.TOGGLE_GUESS_LIKE, {
                    loading: false,
                    noResult: false,
                    data: {
                        list: [...state.guessLike.data.list, ...data?.list],
                    },
                });
            } else {
                commit(playerMutationTypes.TOGGLE_GUESS_LIKE, {
                    loading: false,
                    noResult: true,
                    data: {
                        ...state.guessLike.data,
                    },
                });
            }
        });
    },
};
