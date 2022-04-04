<template>
    <el-menu :default-active='editableTabId' :background-color='elMenuStyle.backgroundColor'
             :text-color='elMenuStyle.textColor' :active-text-color='elMenuStyle.activeTextColor'>
        <sub-side-menu :sub-menu-list='menuList'></sub-side-menu>
    </el-menu>
</template>

<script>

    import globalRoute from '@/config/globalRoute';
    import SubSideMenu from '@/views/home/components/SubSideMenu';

    export default {
        name: 'SideMenu',
        components: {SubSideMenu},
        data() {
            return {
                globalRoute,
                elMenuStyle: {
                    backgroundColor: '#545c64',
                    textColor: '#fff',
                    activeTextColor: '#ffd04b'
                }
            };
        },
        computed: {
            menuList: {
                get() {
                    let menuList = JSON.parse(JSON.stringify(this.$store.state.menus.menuList));
                    menuList.unshift(globalRoute.indexRoute);
                    return menuList;
                }
            },
            editableTabId: {
                get() {
                    return this.$store.state.menus.editableTabId;
                }
            }
        }
    };
</script>

<style scoped>
    .el-menu {
        height: 100%;
        border-right: unset;
    }
</style>
