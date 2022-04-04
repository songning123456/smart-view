import axios from 'axios';
import router from './router';
import {getStore} from '@/utils/store';

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
        let res = response.data;
        if (res.code === 200) {
            return response;
        } else {
            return Promise.reject(res.message);
        }
    },
    error => {
        if (error.response.status === 401) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default request;
