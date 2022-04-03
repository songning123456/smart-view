// 遍历菜单
export const forEachMenu = (menuList, optionRoutes = [], pathArr = []) => {
    for (let menu of menuList) {
        if (menu.path) {
            pathArr.push(menu.path);
            let route = menuToRoute(menu);
            if (Array.isArray(optionRoutes) && optionRoutes.length) {
                optionRoutes[0].children.push(route);
            }
        }
        if (Array.isArray(menu.children) && menu.children.length) {
            forEachMenu(menu.children, optionRoutes, pathArr);
        }
    }
};

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
