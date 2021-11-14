/*
 * @version:  ;
 * @description:  校验登录;
 * @autor: Full
 * @date: Do not edit
 */
import router from '@/router';
import { Cache } from '@/utils/localStorage';
import { sessionCache } from '@/utils/sessionStorage';
import { useStore } from '@/store';
import { configActionTypes } from '@/store/modules/config/action-types';

router.beforeEach((to, from, next) => {
    //保存from,to路由
    const store = useStore();
    store.dispatch(configActionTypes.GET_PATH, {
        to: to.path,
        from: from.fullPath,
    });

    const UserToken = Cache.localGet('token') || '';
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!UserToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

//清除登录状态
export const ClearLoginState = () => {
    Cache.localRemove('token');
    Cache.localRemove('userid');
    Cache.localRemove('loginInfo');
    Cache.localRemove('touristToken');
    Cache.localRemove('touristUserid');
    sessionCache.sessionRemove('showAd');
};
