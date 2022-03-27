import Vue from 'vue';
import Vuex from 'vuex';
import globalMenu from '@/config/globalMenu.js';

Vue.use(Vuex);

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoutes: false,
        editableTabId: globalMenu.indexMenu.id,
        editableTabs: [globalMenu.indexMenu]
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus;
        },
        setPermList(state, perms) {
            state.permList = perms;
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes;
        },
        addTab(state, tab) {
            let index = state.editableTabs.findIndex(e => e.id === tab.id);
            if (index === -1) {
                state.editableTabs.push(tab);
            }
            state.editableTabId = tab.id;
        },
        resetState: (state) => {
            state.menuList = [];
            state.permList = [];
            state.hasRoutes = false;
            state.editableTabId = globalMenu.indexMenu.id;
            state.editableTabs = [globalMenu.indexMenu];
        }
    },
    actions: {},
};
