<template>
    <el-container>
        <el-aside width='200px'>
            <SideMenu></SideMenu>
        </el-aside>
        <el-container width='calc(100% - 200px)'>
            <el-header style='height: 60px'>
                <strong>VueAdmin后台管理系统</strong>
                <div class="header-avatar">
                    <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
                    <el-dropdown>
						<span class="el-dropdown-link">
						{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native='userCenterBtn'>个人中心</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-link href="https://markerhub.com" target="_blank">网站</el-link>
                    <el-link href="https://space.bilibili.com/13491144" target="_blank">B站</el-link>
                </div>
            </el-header>
            <el-main style='height: calc(100% - 60px)'>
                <Tabs style='height: 41px'></Tabs>
                <div style='height: calc(100% - 41px); width: 100%; box-sizing: border-box; padding: 10px'>
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SideMenu from './inc/SideMenu';
    import Tabs from './inc/Tabs';
    import globalMenu from '@/config/globalMenu';

    export default {
        name: 'Home',
        components: {
            SideMenu, Tabs
        },
        data() {
            return {
                globalMenu,
                userInfo: {
                    id: '',
                    username: '',
                    avatar: ''
                }
            };
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            userCenterBtn() {
                this.$store.commit('addTab', globalMenu.userCenterMenu);
                this.$router.push({path: globalMenu.userCenterMenu.path});
            },
            getUserInfo() {
                this.$axios.get('/boot/sys/sysUser/userInfo').then(res => {
                    this.userInfo = res.data.result;
                });
            },
            logout() {
                this.$axios.post('/boot/logout').then(res => {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$store.commit('resetState');
                    this.$router.push('/login');
                });
            }
        }
    };
</script>

<style scoped>
    .el-container {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }

    .header-avatar {
        float: right;
        width: 210px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-header {
        background-color: #17B3A3;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }

    .el-main {
        color: #333;
        padding: 0;
    }

    a {
        text-decoration: none;
    }
</style>
