/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from 'vuex';
import { ShortVideoState } from './state';
import { shortVideoMutationTypes } from './mutation-types';
import { ShortVideoType, ShortVideoAdType } from '@/types/api/shortVideo';

export type Mutations<S = ShortVideoState> = {
    [shortVideoMutationTypes.SET_SHORTVIDEO](
        state: S,
        data: ShortVideoType,
    ): void;
    [shortVideoMutationTypes.SET_SHORTVIDEAD](
        state: S,
        data: ShortVideoAdType,
    ): void;
    [shortVideoMutationTypes.SET_DELSHORTVIDEO](state: S): void;
};

export const mutations: MutationTree<ShortVideoState> & Mutations = {
    [shortVideoMutationTypes.SET_SHORTVIDEO](
        state: ShortVideoState,
        data: ShortVideoType,
    ) {
        state.shortVideo.data = data;
    },
    [shortVideoMutationTypes.SET_SHORTVIDEAD](
        state: ShortVideoState,
        data: ShortVideoAdType,
    ) {
        state.shortVideo.adlist = data;
    },
    [shortVideoMutationTypes.SET_DELSHORTVIDEO](state: ShortVideoState) {
        state.shortVideo.data.video = [];
    },
};
