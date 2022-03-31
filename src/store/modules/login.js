import Vue from 'vue';
import Vuex from 'vuex';
import {setStore} from '@/utils/store';

Vue.use(Vuex);

export default {
    state: {
        token: ''
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
            setStore({type: 'local', key: 'token', val: token});
        },
    },
};
