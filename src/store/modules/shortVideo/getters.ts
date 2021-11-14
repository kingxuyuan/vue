/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from 'vuex';
import { ShortVideoState } from './state';
import { RootState } from '../../index';
import { ShortVideoType, ShortVideoAdType } from '@/types/api/shortVideo';

export type Getters = {
    getterShortVideo(state: ShortVideoState): ShortVideoType;
    getterShortAd(state: ShortVideoState): ShortVideoAdType;
};

export const getters: GetterTree<ShortVideoState, RootState> & Getters = {
    getterShortVideo: (state) => state.shortVideo.data,
    getterShortAd: (state) => state.shortVideo.adlist,
};
