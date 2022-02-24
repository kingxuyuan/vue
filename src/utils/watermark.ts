/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-23 19:09:39
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 14:05:49
 * @Description: 
 */
/**  水印添加方法  */

 const setWaterMark = (dom: any, name = '') => {
    let can = document.createElement('canvas');
    let div = document.createElement('div');
    // 设置canvas画布大小
    can.width = 300;
    can.height = 300;

    let cans: any = can.getContext('2d');
    cans.rotate(-20 * Math.PI / 180); // 水印旋转角度
    cans.font = '16px Vedana';
    cans.fillStyle = '#666666';
    cans.textAlign = 'center';
    cans.textBaseline = 'Middle';
    cans.fillText(name, can.width / 2, can.height); // 水印在画布的位置x，y轴
    // str2 && cans.fillText(str2, can.width / 2, can.height + 22)

    div.style.pointerEvents = 'none';
    // div.style.top = '0px';
    // div.style.left = '0px';
    // div.style.right = '0px';
    // div.style.bottom = '0px';
    div.style.inset = '0px';
    div.style.opacity = '0.2';
    div.style.position = 'absolute';
    div.style.zIndex = '9';
    div.style.width =  '100%'; //document.documentElement.clientWidth + 'px';
    div.style.height = '100%'; //document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    dom?.appendChild(div);
};

export default setWaterMark;