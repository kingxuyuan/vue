import { ActiveDataType } from '@/types/api/active';

export interface ActiveStatusType {
    loading: boolean;
    data: ActiveDataType;
    noResult: boolean;
}

export type ActiveState = {
    active: ActiveStatusType;
};

export const state: ActiveState = {
    active: {
        loading: false,
        data: {},
        noResult: false,
    } as ActiveStatusType,
};
