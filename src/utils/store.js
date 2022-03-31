import {validateNull} from '@/utils/validate';

/**
 * 存储 sessionStorage/localStorage
 */
export const setStore = (params = {}) => {
    let {
        key,
        val,
        type,
    } = params;
    let obj = {
        dataType: typeof (val),
        val: val,
        type: type,
        datetime: new Date().getTime()
    };
    if (type === 'session') {
        window.sessionStorage.setItem(key, JSON.stringify(obj));
    } else if (type === 'local') {
        window.localStorage.setItem(key, JSON.stringify(obj));
    }
};

/**
 * 获取 sessionStorage/localStorage
 */
export const getStore = (params = {}) => {
    let {
        key,
        debug
    } = params;
    let val;
    let obj = window.sessionStorage.getItem(key);
    if (validateNull(obj)) {
        obj = window.localStorage.getItem(key);
    }
    if (validateNull(obj)) {
        return;
    }
    try {
        obj = JSON.parse(obj);
    } catch {
        return obj;
    }
    if (debug) {
        return obj;
    }
    if (obj.dataType === 'string') {
        val = obj.val;
    } else if (obj.dataType === 'number') {
        val = Number(obj.val);
    } else if (obj.dataType === 'boolean') {
        val = eval(obj.val);
    } else if (obj.dataType === 'object') {
        val = obj.val;
    }
    return val;
};

/**
 * 删除 sessionStorage/localStorage
 */
export const removeStore = (params = {}) => {
    let {
        key,
        type
    } = params;
    if (type === 'session') {
        window.sessionStorage.removeItem(key);
    } else if (type === 'local') {
        window.localStorage.removeItem(key);
    } else {
        window.sessionStorage.removeItem(key);
        window.localStorage.removeItem(key);
    }

};

/**
 * 获取全部 sessionStorage/localStorage
 */
export const getStores = (params = {}) => {
    let list = [];
    let {
        type
    } = params;
    if (type === 'session') {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                key: window.sessionStorage.key(i),
                val: getStore({
                    key: window.sessionStorage.key(i),
                    type: 'session'
                })
            });
        }
    } else if (type === 'local') {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                key: window.localStorage.key(i),
                val: getStore({
                    key: window.localStorage.key(i),
                })
            });

        }
    } else {

    }
    return list;
};

/**
 * 清空全部 sessionStorage/localStorage
 */
export const clearStore = (params = {}) => {
    let {type} = params;
    if (type === 'session') {
        window.sessionStorage.clear();
    } else if (type === 'local') {
        window.localStorage.clear();
    } else {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }
};

