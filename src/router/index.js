import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import Index from '../views/index/Index.vue';

import axios from '../axios';
import store from '../store';
import {getStore} from '@/utils/store';

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
            },
            err404Route
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    }
];

const vueRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const vueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return vueRouterPush.call(this, to).catch(e => {
        if (('' + e).search('Cannot find module') > -1 || ('' + e).search('/404') > -1) {
            return vueRouterPush.call(this, err404Route);
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
        });
    }
    next();
});

// 导航转成路由
const menuToRoute = (menu) => {
    if (!menu.path) {
        return null;
    }
    let pathArr = menu.path.split('/');
    let route = {
        name: pathArr[pathArr.length - 1],
        path: menu.path,
        meta: {
            icon: menu.metaIcon,
            title: menu.metaTitle
        }
    };
    route.component = () => import('@/views' + menu.path + '.vue');
    return route;
};

const forEachMenu = (menuList, optionRoutes, pathArr = []) => {
    for (let menu of menuList) {
        if (menu.path) {
            pathArr.push(menu.path);
            let route = menuToRoute(menu);
            optionRoutes[0].children.push(route);
        }
        if (menu.children && menu.children.length) {
            forEachMenu(menu.children, optionRoutes, pathArr);
        }
    }
};

export default vueRouter;

VueRouter.matcher = new VueRouter().matcher;
