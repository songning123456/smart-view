/**
 * 判断是否为空
 */
export function validateNull(val) {
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        return val === 'null' || val === null || val === 'undefined' || val === undefined || val === '';
    }
    return false;
}

/**
 * 判断是否是IP地址
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
    let re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return re.test(ip);
}
