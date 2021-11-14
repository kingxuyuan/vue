import lazyPlugin from 'vue3-lazy';
import images from '@/assets/images/base';
import type { App } from 'vue';

/**
 * vue3-lazy 配置
 * @param app
 */
export function setupLazyPlugin(app: App<Element>): void {
    app.use(lazyPlugin, {
        loading: images.default,
        error: images.default,
    });
}
