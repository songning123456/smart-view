<template>
    <el-tabs v-model='editableTabId' type='card' closable @tab-remove='tabRemoveBtn' @tab-click='tabClickBtn'>
        <el-tab-pane v-for="(item, index) in editableTabs" :key="item.id + index" :label="item.metaTitle"
                     :name="item.id"></el-tab-pane>
    </el-tabs>
</template>

<script>
    import globalRoute from '@/config/globalRoute';
    import {setStore} from '@/utils/store';

    export default {
        name: 'TopMenu',
        data() {
            return {
                globalRoute
            };
        },
        created() {
            this.$store.commit('addTab', globalRoute.indexRoute);
        },
        computed: {
            editableTabs: {
                get() {
                    return this.$store.state.menus.editableTabs;
                },
                set(val) {
                    this.$store.state.menus.editableTabs = val;
                    setStore({type: 'session', key: 'editableTabs', val: val});
                }
            },
            editableTabId: {
                get() {
                    return this.$store.state.menus.editableTabId;
                },
                set(val) {
                    this.$store.state.menus.editableTabId = val;
                    setStore({type: 'session', key: 'editableTabId', val: val});
                }
            }
        },
        methods: {
            tabRemoveBtn(targetId) {
                let tabs = this.editableTabs;
                let activeId = this.editableTabId;
                if (activeId === globalRoute.indexRoute.id) {
                    return;
                }
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
