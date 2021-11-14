import { ActionTree, ActionContext } from 'vuex';
import { shortVideoActionTypes } from './action-types';
import { Mutations } from './mutations';
import { shortVideoMutationTypes } from './mutation-types';
import { ShortVideoState } from './state';
import { RootState } from '../../index';
import { getShortVideoData, getShortVideoAd } from '@/api/shortVideo';
import { ShortVideoParamsType } from '@/types/api/shortVideo';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ShortVideoState, RootState>, 'commit'>;
export interface Actions {
    [shortVideoActionTypes.GET_SHORTVIDEO](
        { commit }: AugmentedActionContext,
        params: ShortVideoParamsType,
    ): void;
    [shortVideoActionTypes.GET_SHORTVIDEOAD]({
        commit,
    }: AugmentedActionContext): void;
}

export const actions: ActionTree<ShortVideoState, RootState> & Actions = {
    [shortVideoActionTypes.GET_SHORTVIDEO](
        { commit, state },
        params: ShortVideoParamsType,
    ) {
        getShortVideoData(params).then((res: any) => {
            if (res.code === 200) {
                commit(shortVideoMutationTypes.SET_SHORTVIDEO, {
                    video: [...state.shortVideo.data.video, ...res.data.video],
                });
            }
        });
    },
    [shortVideoActionTypes.GET_SHORTVIDEOAD]({ commit, state }) {
        getShortVideoAd().then((res: any) => {
            if (res.code === 200) {
                commit(shortVideoMutationTypes.SET_SHORTVIDEAD, res.data);
            }
        });
    },
};
