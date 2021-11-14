/**
 * @description: 复制 ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

import Clipboard from 'clipboard';
import { Toast } from 'vant';

export const clipboardSuccess = (msg?: string) =>
    Toast.success(msg || '复制成功');

export const clipboardError = (msg?: string) => Toast.fail(msg || '复制失败');

export const handleClipboard = (
    text: string,
    event: MouseEvent,
    msg?: string,
) => {
    const clipboard = new Clipboard(event.target as Element, {
        text: () => text,
    });
    clipboard.on('success', () => {
        clipboardSuccess(msg);
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        clipboardError(msg);
        clipboard.destroy();
    });
    (clipboard as any).onClick(event);
};
