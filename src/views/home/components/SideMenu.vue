<template>
    <el-menu :default-active='editableTabId' class='el-menu-vertical-demo'
             background-color='#545c64' text-color='#fff' active-text-color='#ffd04b'>
        <el-menu-item :index='globalRoute.indexRoute.id' @click="selectMenu(globalRoute.indexRoute)">
            <template slot='title'>
                <i :class=globalRoute.indexRoute.metaIcon></i>
                <span slot='title'>{{globalRoute.indexRoute.metaTitle}}</span>
            </template>
        </el-menu-item>
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
                    return this.$store.state.menus.menuList;
                }
            },
            editableTabId: {
                get() {
                    return this.$store.state.menus.editableTabId;
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
