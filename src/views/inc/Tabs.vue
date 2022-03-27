<template>
    <el-tabs v-model="editableTabId" type="card" closable @tab-remove="tabRemoveBtn" @tab-click="tabClickBtn">
        <el-tab-pane v-for="(item, index) in editableTabs" :key="index" :label="item.metaTitle"
                     :name="item.id"></el-tab-pane>
    </el-tabs>
</template>

<script>
    import globalMenu from '@/config/globalMenu';

    export default {
        name: 'Tabs',
        data() {
            return {
                globalMenu
            };
        },
        computed: {
            editableTabs: {
                get() {
                    return this.$store.state.menus.editableTabs;
                },
                set(val) {
                    this.$store.state.menus.editableTabs = val;
                }
            },
            editableTabId: {
                get() {
                    return this.$store.state.menus.editableTabId;
                },
                set(val) {
                    this.$store.state.menus.editableTabId = val;
                }
            }
        },
        methods: {

            tabRemoveBtn(targetId) {
                let tabs = this.editableTabs;
                let activeId = this.editableTabId;
                if (activeId === globalMenu.indexMenu.id) {
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

<style scoped>

</style>
