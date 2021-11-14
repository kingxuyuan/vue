import { ShortVideoType, ShortVideoAdType } from '@/types/api/shortVideo';

export interface ShortViodeStatusType {
    data: ShortVideoType;
    adlist: ShortVideoAdType;
}

export type ShortVideoState = {
    shortVideo: ShortViodeStatusType;
};

export const state: ShortVideoState = {
    shortVideo: {
        data: {
            video: [],
        } as ShortVideoType,
        adlist: [] as unknown as ShortVideoAdType,
    } as ShortViodeStatusType,
};
