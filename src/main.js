import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';

import axios from './axios';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// 注册监听事件
Vue.prototype.$bus = new Vue();

// 使用Element-ui
Vue.use(Element);
// 使用VideoPlayer视频播放
Vue.use(VideoPlayer);

let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

export default vue;
