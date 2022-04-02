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
        if (('' + e).search('Cannot find module') > -1) {
            return vueRouterPush.call(this, err404Route);
        }
    });
};

// 解决[vue-router] Duplicate named routes definition....
vueRouter.$addRoutes = (params) => {
    vueRouter.matcher = new VueRouter({mode: 'history'}).matcher;
    vueRouter.addRoutes(params);
};

vueRouter.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoutes;
    let token = getStore({type: 'local', key: 'token'});
    if (to.path === '/login') {
        next();
    } else if (!token) {
        next({path: '/login'});
    } else if (token && !hasRoute) {
        axios.get('/boot/sys/sysMenu/myMenu', {
            headers: {
                Authorization: getStore({type: 'local', key: 'token'})
            }
        }).then(res => {
            // 拿到menuList
            store.commit('setMenuList', res.data.result);
            // 动态绑定路由
            let newRoutes = vueRouter.options.routes;
            res.data.result.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {
                        // 转成路由
                        let route = menuToRoute(e);
                        // 把路由添加到路由管理中
                        if (route && !vueRouter.getRoutes().find(item => item.name === route.name)) {
                            newRoutes[0].children.push(route);
                        }
                    });
                }
            });
            vueRouter.$addRoutes(newRoutes);
            hasRoute = true;
            store.commit('changeRouteStatus', hasRoute);
            next({path: to.path});
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

export default vueRouter;

VueRouter.matcher = new VueRouter().matcher;
