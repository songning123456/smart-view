<template>
    <div class='infos'>
        <i :class='collapse.flag ? "el-icon-s-unfold" : "el-icon-s-fold"' @click='collapseBtn'></i>
        <div class='user-info'>
            <el-avatar size='medium' :src='avatarFunc(userInfo.avatar)'></el-avatar>
            <el-dropdown><span class="el-dropdown-link">{{userInfo.realname}}<i
                    class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="userCenterBtn">账户设置</el-dropdown-item>
                    <el-dropdown-item @click.native="logoutBtn">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {dictItem} from '@/utils/sysDict';

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
                fileServerPrefix: '',
                userInfo: {}
            };
        },
        created() {
            this.getUserInfoFunc();
            dictItem('FileServer').then(result => {
                this.fileServerPrefix = result[0].itemValue;
            });
        },
        methods: {
            collapseBtn() {
                this.collapse.flag = !this.collapse.flag;
            },
            userCenterBtn() {
                let targetMenu = this.$store.state.menus.menuArr.find(item => item.path === '/information/UserCenter');
                this.$store.commit('addTab', targetMenu);
                this.$router.push({path: targetMenu.path});
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
            avatarFunc(avatar) {
                if (typeof avatar === 'string' && !avatar.startsWith('http://') && !avatar.startsWith('https://')) {
                    avatar = this.fileServerPrefix + avatar;
                }
                return avatar;
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

        .el-icon-s-unfold, .el-icon-s-fold {
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
