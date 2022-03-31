<template>
    <el-menu :default-active="this.$store.state.menus.editableTabId" class="el-menu-vertical-demo"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item :index='globalMenu.indexMenu.id' @click="selectMenu(globalMenu.indexMenu)">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </template>
        </el-menu-item>
        <el-submenu :index="menu.id" v-for="(menu, index) in menuList" :key='index'>
            <template slot="title">
                <i :class="menu.metaIcon"></i>
                <span>{{menu.metaTitle}}</span>
            </template>
            <el-menu-item v-for="(item, i) in menu.children" :key='i' :index="item.id" @click="selectMenu(item)">
                <template slot="title">
                    <i :class="item.metaIcon"></i>
                    <span slot="title">{{item.metaTitle}}</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>

    import globalMenu from '@/config/globalMenu';

    export default {
        name: 'SideMenu',
        data() {
            return {
                globalMenu
            };
        },
        computed: {
            menuList: {
                get() {
                    return this.$store.state.menus.menuList;
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

<style scoped>
    .el-menu-vertical-demo {
        height: 100%;
    }
</style>
