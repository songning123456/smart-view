import axios from 'axios';
import router from './router';
import Element from 'element-ui';
import {getStore} from '@/utils/store';

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

request.interceptors.request.use(config => {
    config.headers['Authorization'] = getStore({type: 'local', key: 'token'});
    return config;
});

request.interceptors.response.use(response => {
        let res = response.data;
        if (res.code === 200) {
            return response;
        } else {
            Element.Message.error(!res.message ? '系统异常' : res.message);
            return Promise.reject(res.message);
        }
    },
    error => {
        if (error.response.data) {
            error.massage = error.response.data.message;
        }
        if (error.response.status === 401) {
            router.push('/login');
        }
        Element.Message.error(error.massage, {duration: 3000});
        return Promise.reject(error);
    }
);

export default request;
