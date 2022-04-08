let common = {};

/* 深拷贝
* @param obj
* @returns {*}
*/
common.deepClone = function clone(obj) {
    let result = obj;
    if (typeof obj === 'object' && obj !== null) {
        result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
        for (let prop in obj) {
            result[prop] = clone(obj[prop]);
        }
    }
    return result;
};

/**
 * 保留小数后n位，整数不变
 * @param value
 * @param n
 */
common.keepDecimal = function (value, n) {
    let result = value + '';
    if (result.includes('.')) {
        result = (+result).toFixed(n);
    }
    return +result;
};

export default common;
