/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from 'vuex';
import { ConfigState, PathInfoType } from './state';
import { RootState } from '../../index';
import { ResponseConfigType } from '@/types/api/config';

export type Getters = {
    getterConfig(state: ConfigState): ResponseConfigType;
    getterPath(state: ConfigState): PathInfoType;
    getterShowInit(state: ConfigState): boolean;
    getterShowStart(state: ConfigState): boolean;
    getterShowAd(state: ConfigState): boolean;
    getterIsLoadHome(state: ConfigState): boolean;
};

export const getters: GetterTree<ConfigState, RootState> & Getters = {
    getterConfig: (state) => state.config.data,
    getterPath: (state) => state.config.pathInfo,
    getterShowInit: (state) => state.config.showInit,
    getterShowStart: (state) => state.config.showStart,
    getterShowAd: (state) => state.config.showAd,
    getterIsLoadHome: (state) => state.config.isLoadHome,
};
