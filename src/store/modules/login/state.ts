import { Cache } from '@/utils/localStorage';
export interface LoginStatusType {
    token: string | null;
}

export type LoginState = {
    login: LoginStatusType;
};

export const state: LoginState = {
    login: {
        token: Cache.localGet('token'),
    } as LoginStatusType,
};
