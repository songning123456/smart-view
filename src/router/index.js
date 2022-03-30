import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Index from '../views/Index.vue';

import axios from '../axios';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: '首页'
                },
                component: Index
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: '个人中心'
                },
                component: () => import('@/views/UserCenter.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
];

const vueRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const vueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return vueRouterPush.call(this, to).catch(err => err);
};

// 解决[vue-router] Duplicate named routes definition....
vueRouter.$addRoutes = (params) => {
    vueRouter.matcher = new VueRouter({mode: 'history'}).matcher;
    vueRouter.addRoutes(params);
};

vueRouter.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoutes;
    let token = localStorage.getItem('token');
    if (to.path === '/login') {
        next();
    } else if (!token) {
        next({path: '/login'});
    } else if (token && !hasRoute) {
        axios.get('/boot/sys/sysMenu/nav', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            // 拿到menuList
            store.commit('setMenuList', res.data.result.navs);
            // 拿到用户权限
            store.commit('setPermList', res.data.result.authorities);
            // 动态绑定路由
            let newRoutes = vueRouter.options.routes;
            res.data.result.navs.forEach(menu => {
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
