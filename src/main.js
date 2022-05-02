import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from './axios';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// 注册监听事件
Vue.prototype.$bus = new Vue();

Vue.use(Element);

let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

export default vue;
