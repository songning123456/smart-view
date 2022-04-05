<template>
    <el-menu ref='elMenu' :default-active='editableTabId' :background-color='elMenuStyle.backgroundColor'
             :text-color='elMenuStyle.textColor' :active-text-color='elMenuStyle.activeTextColor'
             :collapse='collapse.flag' @select='selectBtn'>
        <sub-side-menu :sub-menu-list='menuList'></sub-side-menu>
    </el-menu>
</template>

<script>

    import SubSideMenu from '@/views/home/components/SubSideMenu';
    import {getStore} from '@/utils/store';

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
                    return this.$store.state.menus.menuList;
                }
            },
            editableTabId: {
                get() {
                    let editableTabId = this.$store.state.menus.editableTabId;
                    let sessionEditableTabId = getStore({type: 'session', key: 'editableTabId'});
                    if (!editableTabId && sessionEditableTabId) {
                        editableTabId = sessionEditableTabId;
                    }
                    return editableTabId;
                }
            }
        },
        methods: {
            selectBtn(index, indexPath) {
                let targetMenu = this.$store.state.menus.menuArr.find(item => item.id === index);
                this.$store.commit('addTab', targetMenu);
                this.$router.push({path: targetMenu.path});
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
