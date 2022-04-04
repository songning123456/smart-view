<template>
    <div class='infos'>
        <i :class='collapse.flag ? "el-icon-s-unfold" : "el-icon-s-fold"' @click='collapseBtn'></i>
        <div class='user-info'>
            <el-avatar size='medium' :src='userInfo.avatar'></el-avatar>
            <el-dropdown><span class="el-dropdown-link">{{userInfo.username}}<i
                    class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native='userCenterBtn'>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logoutBtn">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Infos',
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
                userInfo: {}
            };
        },
        created() {
            this.getUserInfoFunc();
        },
        methods: {
            collapseBtn() {
                this.collapse.flag = !this.collapse.flag;
            },
            userCenterBtn() {
                this.$store.commit('addTab', globalRoute.userCenterRoute);
                this.$router.push({path: globalRoute.userCenterRoute.path});
            },
            logoutBtn() {
                this.$axios.post('/boot/logout').then(res => {
                    if (res.data.success) {
                        this.$store.commit('resetState');
                        this.$router.push('/login');
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            getUserInfoFunc() {
                this.$axios.get('/boot/sys/sysUser/myInfo').then(res => {
                    this.userInfo = res.data.result;
                }).catch(e => {
                    this.$message.error(e);
                });
            },
        }
    };
</script>

<style lang='scss' scoped>

    .infos {
        position: relative;
        width: 100%;
        height: 50px;
        background-color: #409eff;

        i {
            position: absolute;
            left: 2%;
            top: 50%;
            transform: translate(-50%, -50%);

            &:hover {
                cursor: pointer;
            }
        }

        .user-info {
            height: 100%;
            width: 120px;
            float: right;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }

</style>
