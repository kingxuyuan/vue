/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-03-09 13:21:21
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 03:31:15
 * @Description: 
 */
const REG = {
    CN_NAME_REG: (val: string): boolean => /^[\u4E00-\u9FA5]{2,10}$|^[A-Za-z]{2,20}$/.test(val),
    // /^[1]([3-9])[0-9]{9}$/  /^1[3456789]\d{9}$/
    CN_MOBILE_PHONE_REG: (val: string): boolean => /^[1]([3-9])[0-9]{9}$/.test(val)
};

export default REG;