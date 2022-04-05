// 遍历菜单
export const forEachMenu = (srcMenuList, optionRoutes = [], targetPathList = [], targetMenuList = []) => {
    for (let menu of srcMenuList) {
        if (menu.path) {
            targetPathList.push(menu.path);
            targetMenuList.push(menu);
            let route = menuToRoute(menu);
            if (Array.isArray(optionRoutes) && optionRoutes.length) {
                optionRoutes[0].children.push(route);
            }
        }
        if (Array.isArray(menu.children) && menu.children.length) {
            forEachMenu(menu.children, optionRoutes, targetPathList, targetMenuList);
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
