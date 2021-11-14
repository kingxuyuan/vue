/*
 * @version:  ;
 * @description: 禁止页面右击、禁止打开F12;
 * @autor: Full
 * @date: Do not edit
 */
!(function () {
    function ProhibitOpenConsole() {}

    ProhibitOpenConsole.prototype.keyF12 = function () {
        document.addEventListener('keydown', function (e) {
            let ev = e || window.event;
            if (ev.keyCode == 123) {
                ev.preventDefault() || (ev.returnValue = false);
            }
        });
    };

    ProhibitOpenConsole.prototype.contextmenu = function () {
        document.addEventListener('contextmenu', function (e) {
            let ev = e || window.event;
            ev.preventDefault() || (ev.returnValue = false);
        });
    };

    ProhibitOpenConsole.prototype.debuggerOpen = function () {
        // var timer = setInterval(() => {
        //     var before = new Date().getTime();
        //     debugger;
        //     var after = new Date().getTime();
        //     if (Math.abs(after - before) < 100) {
        //         clearInterval(timer) //如果同时调keyF12和contextmenu右键函数，则清不清除定时器都可以，但是如果只调用debuggerOpen，则不能清除定时器，避免关闭控制台再打开后debugger失效
        //     }
        // }, 1000);

        setInterval(function () {
            let a = String.fromCharCode(98);
            a = 'd/e' + (a + '/') + 'u';
            a = a + 'g/g';
            a = a + '/e';
            a = a + '/r';
            eval(a.replace(/\//g, ''));
        }, 100);
    };

    ProhibitOpenConsole.prototype.init = function () {
        // this.keyF12();
        // this.contextmenu();
        if (process.env.VUE_APP_ENV !== 'kmdev') {
            this.debuggerOpen();
        }
    };

    let check = new ProhibitOpenConsole();
    check.init();
})();
