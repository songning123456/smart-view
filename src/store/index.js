import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import menus from './modules/menus';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {},
    modules: {
        login,
        menus
    }
});
