/**
 * 添加类名
 * @param el
 * @param className
 */
export function addClass(el: HTMLElement, className: string): void {
    if (!el.classList.contains(className)) el.classList.add(className);
}

/**
 * 移除类名
 * @param el
 * @param className
 */
export function removeClass(el: HTMLElement, className: string): void {
    el.classList.remove(className);
}

/**
 * @description: 是否有class ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export const hasClass = (ele: HTMLElement, className: string) => {
    return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

/**
 * @description:  切换class;
 * @param {HTMLElement} ele
 * @param {string} className
 * @return {*}
 * @author: Full
 */
export const toggleClass = (ele: HTMLElement, className: string) => {
    if (!ele || !className) {
        return;
    }
    let classString = ele.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
    }
    ele.className = classString;
};
