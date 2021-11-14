/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from 'vuex';
import { ActiveState } from './state';
import { RootState } from '../../index';
import { ActiveDataType } from '@/types/api/active';

export type Getters = {
    getterActiveData(state: ActiveState): ActiveDataType;
};

export const getters: GetterTree<ActiveState, RootState> & Getters = {
    getterActiveData: (state) => state.active.data,
};
