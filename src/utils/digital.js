let digital = {};

/**
 * 保留小数后n位，整数不变
 * @param value
 * @param n
 */
digital.keepDecimal = function (value, n) {
    let result = value + '';
    if (result.includes('.')) {
        result = (+result).toFixed(n);
    }
    return +result;
};

export default digital;
