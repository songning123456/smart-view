<template>
    <div class='user-center'>
        <el-tabs v-model='formFlag' @tab-click='tabClickBtn'>
            <el-tab-pane label='修改基本信息' name='base'></el-tab-pane>
            <el-tab-pane label="修改密码信息" name='password'></el-tab-pane>
        </el-tabs>
        <div class='modify-user-form'>
            <custom-form></custom-form>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';

    export default {
        name: 'UserCenter',
        components: {CustomForm},
        data() {
            return {
                formFlag: 'base',
                userInfoForm: {},
                passwordForm: {},
                formStyleOptions: {
                    inline: false,
                    labelWidth: '80px'
                },
            };
        },
        created() {
            this.getUserInfoFunc();
        },
        methods: {
            tabClickBtn() {
            },
            getUserInfoFunc() {
                this.$axios.get('/boot/sys/sysUser/myInfo').then(res => {
                    this.userInfoForm = res.data.result;
                }).catch(e => {
                    this.$message.error(e);
                });
            },
        }
    };
</script>

<style lang='scss' scoped>

    .user-center {
        position: relative;
        width: 100%;
        height: 100%;

        .modify-user-form {
            width: 100%;
            height: calc(100% - 54px);
        }
    }
</style>
