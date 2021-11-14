/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { App } from 'vue';
import { createStore, createLogger } from 'vuex';
import { NODE_ENV } from '@/utils/constants';
import {
    store as config,
    ConfigStore,
    ConfigState,
} from '@/store/modules/config';
import { store as login, LoginStore, LoginState } from '@/store/modules/login';
import { store as user, UserStore, UserState } from '@/store/modules/user';
import {
    store as player,
    PlayerStore,
    PlayerState,
} from '@/store/modules/player';
import {
    store as active,
    ActiveStore,
    ActiveState,
} from '@/store/modules/active';
import {
    store as search,
    SearchStore,
    SearchState,
} from '@/store/modules/search';
import {
    store as movies,
    MoviesStore,
    MoviesState,
} from '@/store/modules/movies';
import {
    store as shortVideo,
    ShortVideoState,
    ShortVideoStore,
} from '@/store/modules/shortVideo';

export interface RootState {
    config: ConfigState;
    login: LoginState;
    user: UserState;
    player: PlayerState;
    active: ActiveState;
    search: SearchState;
    movies: MoviesState;
    shortVideo: ShortVideoState;
}
// 调试工具，开发环境使用，线上关闭
const debug = NODE_ENV !== 'kmprod';

export type Store = ConfigStore<Pick<RootState, 'config'>> &
    LoginStore<Pick<RootState, 'login'>> &
    UserStore<Pick<RootState, 'user'>> &
    PlayerStore<Pick<RootState, 'player'>> &
    ActiveStore<Pick<RootState, 'active'>> &
    SearchStore<Pick<RootState, 'search'>> &
    MoviesStore<Pick<RootState, 'movies'>> &
    ShortVideoStore<Pick<RootState, 'shortVideo'>>;

const store = createStore({
    modules: {
        config,
        login,
        user,
        player,
        active,
        search,
        movies,
        shortVideo,
    },
    plugins: debug ? [createLogger()] : [],
    strict: debug,
});

export function useStore(): Store {
    return store as Store;
}

/**
 * vuex 配置
 * @param app
 */
export function setupStore(app: App<Element>): void {
    app.use(store);
}

export default store;
