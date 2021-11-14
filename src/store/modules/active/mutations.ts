/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from 'vuex';
import { ActiveState } from './state';
import { activeMutationTypes } from './mutation-types';
import { ActiveStatusType } from './state';

export type Mutations<S = ActiveState> = {
    [activeMutationTypes.SET_ACTIVEDATA](
        state: S,
        data: ActiveStatusType,
    ): void;
};

export const mutations: MutationTree<ActiveState> & Mutations = {
    [activeMutationTypes.SET_ACTIVEDATA](
        state: ActiveState,
        data: ActiveStatusType,
    ) {
        state.active = data;
    },
};
