import Vue from 'vue';
import Vuex from 'vuex';
import {getStore, setStore, clearStore} from '@/utils/store';

Vue.use(Vuex);

export default {
    state: {
        menuList: [],
        routeFlag: false,
        editableTabId: '',
        editableTabs: []
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus;
        },
        changeRouteStatus(state, routeFlag) {
            state.routeFlag = routeFlag;
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
            }
            state.editableTabId = editableTabId;
            setStore({type: 'session', key: 'editableTabs', val: editableTabId});
            state.editableTabs = editableTabs;
            setStore({type: 'session', key: 'editableTabs', val: editableTabs});
        },
        resetState: (state) => {
            state.menuList = [];
            state.routeFlag = false;
            state.editableTabId = '';
            state.editableTabs = [];
            clearStore();
        }
    },
    actions: {},
};
