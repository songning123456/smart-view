<template>
    <el-menu :default-active="this.$store.state.menus.editableTabId" class="el-menu-vertical-demo"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <router-link to="/index">
            <el-menu-item :index='baseInfo.defaultMenu.id' @click="selectMenu(baseInfo.defaultMenu)">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </template>
            </el-menu-item>
        </router-link>
        <el-submenu :index="menu.id" v-for="(menu, index) in menuList" :key='index'>
            <template slot="title">
                <i :class="menu.metaIcon"></i>
                <span>{{menu.metaTitle}}</span>
            </template>
            <router-link :to="item.path" v-for="(item, i) in menu.children" :key='i'>
                <el-menu-item :index="item.id" @click="selectMenu(item)">
                    <template slot="title">
                        <i :class="item.metaIcon"></i>
                        <span slot="title">{{item.metaTitle}}</span>
                    </template>
                </el-menu-item>
            </router-link>
        </el-submenu>
    </el-menu>
</template>

<script>

    import baseInfo from "@/config/baseInfo";

    export default {
        name: 'SideMenu',
        data() {
            return {
                baseInfo
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
            }
        }
    };
</script>

<style scoped>
    .el-menu-vertical-demo {
        height: 100%;
    }
</style>
