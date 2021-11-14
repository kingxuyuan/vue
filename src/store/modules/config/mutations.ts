/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from 'vuex';
import { ConfigState, PathInfoType } from './state';
import { configMutationTypes } from './mutation-types';
import { ResponseConfigType } from '@/types/api/config';

export type Mutations<S = ConfigState> = {
    [configMutationTypes.TOGGLE_CONFIG](
        state: S,
        config: ResponseConfigType,
    ): void;
    [configMutationTypes.SET_PATH](state: S, path: PathInfoType): void;
    [configMutationTypes.SET_SHOWINIT](state: S, val: boolean): void;
    [configMutationTypes.SET_SHOWSTART](state: S, val: boolean): void;
    [configMutationTypes.SET_SHOWAD](state: S, val: boolean): void;
    [configMutationTypes.SET_LOADHOME](state: S, val: boolean): void;
};

export const mutations: MutationTree<ConfigState> & Mutations = {
    [configMutationTypes.TOGGLE_CONFIG](
        state: ConfigState,
        config: ResponseConfigType,
    ) {
        state.config.data = config;
    },
    [configMutationTypes.SET_PATH](state: ConfigState, path: PathInfoType) {
        state.config.pathInfo = path;
    },
    [configMutationTypes.SET_SHOWINIT](state: ConfigState, val: boolean) {
        state.config.showInit = val;
    },
    [configMutationTypes.SET_SHOWSTART](state: ConfigState, val: boolean) {
        state.config.showStart = val;
    },
    [configMutationTypes.SET_SHOWAD](state: ConfigState, val: boolean) {
        state.config.showAd = val;
    },
    [configMutationTypes.SET_LOADHOME](state: ConfigState, val: boolean) {
        state.config.isLoadHome = val;
    },
};
