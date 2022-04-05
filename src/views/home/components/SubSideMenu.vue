<template>
    <div class='sub-side-menu'>
        <template v-for='(subMenu, index) in subMenuList'>
            <el-submenu v-if='Array.isArray(subMenu.children) && subMenu.children.length' :index='subMenu.id'
                        :key='index'>
                <template slot='title'>
                    <i :class="subMenu.metaIcon"></i>
                    <span slot='title'>{{subMenu.metaTitle}}</span>
                </template>
                <sub-side-menu :sub-menu-list='subMenu.children'></sub-side-menu>
            </el-submenu>
            <el-menu-item v-else :key='index' :index='subMenu.id'>
                <template slot='title'>
                    <i :class="subMenu.metaIcon"></i>
                    <span slot='title'>{{subMenu.metaTitle}}</span>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'SubSideMenu',
        props: {
            subMenuList: {
                type: Array,
                default() {
                    return [];
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

    .sub-side-menu {
        .el-menu {
            .el-menu-item {
                min-width: unset;
            }
        }
    }

</style>
