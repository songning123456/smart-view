import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import Index from '../views/index/Index.vue';

import axios from '../axios';
import store from '../store';
import {getStore} from '@/utils/store';
import {forEachMenu} from '@/config/globalFunc.js';

Vue.use(VueRouter);

const err404Route = {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/Error404.vue')
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/Index',
                name: 'Index',
                meta: {
                    title: '首页'
                },
                component: Index
            },
            {
                path: '/UserCenter',
                name: 'UserCenter',
                meta: {
                    title: '个人中心'
                },
                component: () => import('@/views/usercenter/UserCenter.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    },
    err404Route
];

const vueRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const vueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return vueRouterPush.call(this, to).catch(e => {
        let errorMessage = '' + e;
        if (errorMessage.search('Cannot find module') > -1 || errorMessage.search('/404') > -1) {
            return vueRouterPush.call(this, err404Route);
        } else if (errorMessage.search('Avoided redundant navigation to current location') > -1) {
            // ...
        } else {
            console.error(e);
        }
    });
};

// 解决[vue-router] Duplicate named routes definition....
vueRouter.$addRoutes = (params) => {
    vueRouter.matcher = new VueRouter({mode: 'history'}).matcher;
    vueRouter.addRoutes(params);
};

vueRouter.beforeEach((to, from, next) => {
    let routeFlag = store.state.menus.routeFlag;
    let token = getStore({type: 'local', key: 'token'});
    if (to.path === '/login') {
        next();
    } else if (!token) {
        next({path: '/login'});
    } else if (token && !routeFlag) {
        axios.get('/boot/sys/sysMenu/myMenu', {
            headers: {
                Authorization: getStore({type: 'local', key: 'token'})
            }
        }).then(res => {
            // 拿到menuList
            store.commit('setMenuList', res.data.result);
            // 动态绑定路由
            let optionRoutes = vueRouter.options.routes;
            let pathArr = [];
            forEachMenu(res.data.result, optionRoutes, pathArr);
            vueRouter.$addRoutes(optionRoutes);
            routeFlag = true;
            store.commit('changeRouteStatus', routeFlag);
            if (pathArr.indexOf(to.path) > -1) {
                next({path: to.path});
            } else {
                next({path: '/login'});
            }
        }).catch(e => {
            next({path: '/login'});
        });
    }
    next();
});


export default vueRouter;

VueRouter.matcher = new VueRouter().matcher;
