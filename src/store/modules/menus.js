import Vue from 'vue';
import Vuex from 'vuex';
import {getStore, setStore, clearStore} from '@/utils/store';

Vue.use(Vuex);

export default {
    state: {
        menuList: [],
        routeFlag: false,
        editableTabId: '',
        editableTabs: [],
        pathArr: [],
        menuArr: []
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus;
        },
        setPathArr(state, pathArr) {
            state.pathArr = pathArr;
        },
        setMenuArr(state, menuArr) {
            state.menuArr = menuArr;
        },
        changeRouteStatus(state, routeFlag) {
            state.routeFlag = routeFlag;
        },
        addTab(state, tab) {
            let editableTabs = [], editableTabId = tab.id;
            let sessionEditableTabs = getStore({type: 'session', key: 'editableTabs'});
            if (state.editableTabs.length) {
                editableTabs = state.editableTabs;
            } else if (sessionEditableTabs) {
                editableTabs = sessionEditableTabs;
            }
            let sessionEditableTabId = getStore({type: 'session', key: 'editableTabId'});
            if (!editableTabId && sessionEditableTabId) {
                editableTabId = sessionEditableTabId;
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
            state.pathArr = [];
            state.menuArr = [];
            clearStore();
        }
    },
    actions: {},
};
