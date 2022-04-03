<template>
    <el-menu :default-active='editableTabId' class='el-menu-vertical-demo'
             background-color='#545c64' text-color='#fff' active-text-color='#ffd04b'>
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
                globalRoute
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
    .el-menu-vertical-demo {
        height: 100%;
    }
</style>
