import { ResponseConfigType } from '@/types/api/config';
import { sessionCache } from '@/utils/sessionStorage';

export interface PathInfoType {
    from: string;
    to: string;
}
export interface ConfigStatusType {
    data: ResponseConfigType;
    pathInfo: PathInfoType;
    showInit: boolean;
    showStart: boolean;
    showAd: boolean;
    isLoadHome: boolean;
}

export type ConfigState = {
    config: ConfigStatusType;
};

export const state: ConfigState = {
    config: {
        data: {},
        pathInfo: {},
        showInit: true,
        showStart: true,
        showAd: !sessionCache.sessionGet('showAd') || false,
        isLoadHome: false,
    } as ConfigStatusType,
};
