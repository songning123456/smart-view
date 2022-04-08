import axios from 'axios';
import router from './router';
import {getStore} from '@/utils/store';
import store from '@/store/index';

const request = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

request.interceptors.request.use(config => {
    config.headers['Authorization'] = getStore({type: 'local', key: 'token'});
    return config;
});

request.interceptors.response.use(response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            store.commit('resetState');
            router.push('/login');
            return Promise.reject('token失效，请重新登录！');
        }
        return Promise.reject(error);
    }
);

export default request;
