let clone = {};

/**
 * 深拷贝
 * @param obj
 */
clone.deepClone = function clone(obj) {
    let result = obj;
    if (typeof obj === 'object' && obj !== null) {
        result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
        for (let prop in obj) {
            result[prop] = clone(obj[prop]);
        }
    }
    return result;
};

export default clone;
