import Vue from 'vue';
import Vuex from 'vuex';
import {getStore, setStore, clearStore} from '@/utils/store';

Vue.use(Vuex);

export default {
    state: {
        menuList: [],
        hasRoutes: false,
        editableTabId: '',
        editableTabs: []
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus;
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes;
        },
        addTab(state, tab) {
            let editableTabs = [], editableTabId = tab.id;
            if (state.editableTabs.length) {
                editableTabs = state.editableTabs;
            } else if (getStore({type: 'session', key: 'editableTabs'})) {
                editableTabs = getStore({type: 'session', key: 'editableTabs'});
                if (getStore({type: 'session', key: 'editableTabId'})) {
                    editableTabId = getStore({type: 'session', key: 'editableTabId'});
                }
            }
            let index = editableTabs.findIndex(e => e.id === tab.id);
            if (index === -1) {
                editableTabs.push(tab);
                setStore({type: 'session', key: 'editableTabs', val: editableTabs});
            }
            state.editableTabId = editableTabId;
            state.editableTabs = editableTabs;
        },
        resetState: (state) => {
            state.menuList = [];
            state.hasRoutes = false;
            state.editableTabId = '';
            state.editableTabs = [];
            clearStore();
        }
    },
    actions: {},
};
