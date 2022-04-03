<template>
    <div>
        <template v-for='(subMenu, index) in subMenuList'>
            <el-submenu v-if='subMenu.children && subMenu.children.length' :index='subMenu.id' :key='index'>
                <template slot='title'>
                    <i :class="subMenu.metaIcon"></i>
                    <span slot='title'>{{subMenu.metaTitle}}</span>
                </template>
                <sub-side-menu :sub-menu-list='subMenu.children'></sub-side-menu>
            </el-submenu>
            <el-menu-item v-else :key='index' :index='subMenu.id' @click='selectMenu(subMenu)'>
                <template slot='title'>
                    <i :class="subMenu.metaIcon"></i>
                    <span slot='title'>{{subMenu.metaTitle}}</span>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>

<script>

    import {forEachMenu} from '@/config/globalFunc';

    export default {
        name: 'SubSideMenu',
        props: {
            subMenuList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            selectMenu(item) {
                this.$store.commit('addTab', item);
                this.$router.push({path: item.path});
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
