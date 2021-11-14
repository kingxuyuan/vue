import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setup } from 'axios-cache-adapter';
import axios from 'axios-extra';

localforage.defineDriver(memoryDriver);

// Create `localforage` instance
export const forageStore = localforage.createInstance({
    // List of drivers used
    driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver,
    ],
    // Prefix all storage keys to prevent conflicts
    name: 'img-cache',
});

// `async` wrapper to configure `localforage` and instantiate `axios` with `axios-cache-adapter`
export async function configure(url: string) {
    // Register the custom `memoryDriver` to `localforage`

    let setup = axios.create({
        baseURL: url,
        timeout: 30000, //30s超时
        maxConcurrent: 1, //并发为1
        queueOptions: {
            retry: 3, //请求失败时,最多会重试3次
            retryIsJump: true, //是否立即重试, 否则将在请求队列尾部插入重试请求
        },
    });

    return setup;
    // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
    // return setup({
    //     // `axios` options
    //     baseURL: url,
    //     timeout: 30000, //30s超时
    //     // `axios-cache-adapter` options
    //     cache: {
    //         // @ts-ignore
    //         maxAge: 15 * 60 * 1000,
    //         store: forageStore, // Pass `localforage` store to `axios-cache-adapter`
    //         readOnError: (error: any, request: any) => {
    //             return (
    //                 error.response.status >= 400 && error.response.status < 600
    //             );
    //         },
    //         // Deactivate `clearOnStale` option so that we can actually read stale cache data
    //         clearOnStale: false,
    //     },
    // });
}
