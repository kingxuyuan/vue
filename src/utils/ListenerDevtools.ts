/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-23 19:41:22
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-23 20:17:55
 * @Description: 
 */
const listenerDevtools = () => {
    //禁止页面选择以及鼠标右键
    (document as any).οncοntextmenu = () => false;
    (document as any).onselectstart = () => false;

    //禁用右键
    (document as any).oncontextmenu = () => false;

    //在本网页的任何键盘敲击事件都是无效操作 （防止F12和shift+ctrl+i调起开发者工具）  
    // window.onkeydown = window.onkeyup = window.onkeypress = function () {
    //     (window as any).event.returnValue = false;
    //     return false;
    // }

    //禁用开发者工具F12
    document.onkeydown = function () {
        if (window.event && (window as any).event.keyCode === 123) {
            // (window as any).event.keyCode = 0;
            // (window as any).event.returnValue = false;
            return false;
        }
    };
    // if (window.location.href.indexOf('#debug') == -1) {
    //     setInterval(function () {
    //         (function (a) { return (function (a) { return (Function('Function(arguments[0]+"' + a + '")()')) })(a) })('bugger')('de', 0, 0, (0, 0));
    //     }, 1000);
    // }
    
    setInterval(function () {
        check()
    }, 1000);
    var check = function () {
        function doCheck(a: any) {
            if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
                (function () { }
                ["constructor"]("debugger")())
            } else {
                (function () { }
                ["constructor"]("debugger")())
            }
            doCheck(++a)
        }
        try {
            doCheck(0)
        } catch (err) { }
    };
    check();
};

export default listenerDevtools;