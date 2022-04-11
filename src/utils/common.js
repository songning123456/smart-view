let common = {};

/**
 * 深拷贝
 * @param obj
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

/**
 * 通过a标签下载
 * @param url
 */
common.downloadByA = function (url) {
    let domA = document.createElement('a'); // js创建a标签
    domA.style.display = 'none';
    domA.target = '_blank';
    domA.setAttribute('download', ''); // 给a标签设置download属性
    domA.setAttribute('href', url); // 给a标签href属性赋值为要下载文件的路径
    domA.click(); // 点击下载
};

export default common;
