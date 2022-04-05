<template>
    <el-tabs v-model='editableTabId' type='card' closable @tab-remove='tabRemoveBtn' @tab-click='tabClickBtn'>
        <el-tab-pane v-for="(item, index) in editableTabs" :key="item.id + index" :label="item.metaTitle"
                     :name="item.id"></el-tab-pane>
    </el-tabs>
</template>

<script>
    import {getStore, setStore} from '@/utils/store';

    export default {
        name: 'Tabs',
        data() {
            return {};
        },
        computed: {
            editableTabs: {
                get() {
                    let editableTabs = this.$store.state.menus.editableTabs;
                    let sessionEditableTabs = getStore({type: 'session', key: 'editableTabs'});
                    if (!editableTabs.length && sessionEditableTabs) {
                        editableTabs = sessionEditableTabs;
                    }
                    if (!editableTabs.length && this.$store.state.menus.menuArr.length) {
                        editableTabs = this.$store.state.menus.menuArr.slice(0, 1);
                        this.$store.commit('addTab', editableTabs[0]);
                    }
                    return editableTabs;
                },
                set(val) {
                    if (Array.isArray(val)) {
                        this.$store.state.menus.editableTabs = val;
                        setStore({type: 'session', key: 'editableTabs', val: val});
                    }
                }
            },
            editableTabId: {
                get() {
                    let editableTabId = this.$store.state.menus.editableTabId;
                    let sessionEditableTabId = getStore({type: 'session', key: 'editableTabId'});
                    if (!editableTabId && sessionEditableTabId) {
                        editableTabId = sessionEditableTabId;
                    }
                    if (!editableTabId && this.$store.state.menus.menuArr.length) {
                        editableTabId = this.$store.state.menus.menuArr[0].id;
                    }
                    return editableTabId;
                },
                set(val) {
                    if (val) {
                        this.$store.state.menus.editableTabId = val;
                        setStore({type: 'session', key: 'editableTabId', val: val});
                    }
                }
            }
        },
        methods: {
            tabRemoveBtn(targetId) {
                let tabs = this.editableTabs;
                // 首页不能删
                if (tabs.findIndex(item => item.id === targetId && item.path === '/index') > -1) {
                    return;
                }
                let activeId = this.editableTabId;
                if (activeId === targetId) {
                    tabs.forEach((tab, index) => {
                        if (tab.id === targetId) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeId = nextTab.id;
                            }
                        }
                    });
                }
                this.editableTabId = activeId;
                this.editableTabs = tabs.filter(tab => tab.id !== targetId);
                let index = this.editableTabs.findIndex(item => item.id === activeId);
                this.$router.push({path: this.editableTabs[index].path});
            },
            tabClickBtn(target) {
                let index = this.editableTabs.findIndex(item => item.id === target.name);
                this.$router.push({path: this.editableTabs[index].path});
            }
        }
    };
</script>

<style lang='scss' scoped>

    .el-tabs {
        /deep/ .el-tabs__header {
            margin-bottom: unset;
        }
    }

</style>
