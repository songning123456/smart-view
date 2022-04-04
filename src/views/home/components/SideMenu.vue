<template>
    <el-menu :default-active='editableTabId' :background-color='elMenuStyle.backgroundColor'
             :text-color='elMenuStyle.textColor' :active-text-color='elMenuStyle.activeTextColor'
             :collapse='collapse.flag'>
        <sub-side-menu :sub-menu-list='menuList'></sub-side-menu>
    </el-menu>
</template>

<script>

    import globalRoute from '@/config/globalRoute';
    import SubSideMenu from '@/views/home/components/SubSideMenu';

    export default {
        name: 'SideMenu',
        components: {SubSideMenu},
        props: {
            collapse: {
                type: Object,
                default() {
                    return {
                        flag: false
                    };
                }
            }
        },
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

<style lang='scss' scoped>

    .el-menu {
        height: 100%;
        border-right: unset;
    }

    .el-menu--collapse {

        /deep/ .el-submenu__title {

            span {
                height: 0;
                width: 0;
                overflow: hidden;
                visibility: hidden;
                display: inline-block;
            }
        }

        /deep/ .el-submenu__icon-arrow {
            visibility: hidden;
        }
    }
</style>
