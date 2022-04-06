<template>
    <div class='user-center'>
        <el-tabs v-model='formFlag' @tab-click='tabClickBtn'>
            <el-tab-pane label='修改基本信息' name='base'></el-tab-pane>
            <el-tab-pane label="修改密码信息" name='password'></el-tab-pane>
        </el-tabs>
        <div class='modify-user-form'>
            <custom-form :ref="formFlag + 'CustomForm'" v-if='formFlag === "base"' :form='baseForm' :form-options='baseFormOptions'
                         :form-style-options='formStyleOptions' :rule-options='baseRuleOptions'
                         @crud='crudBtn'></custom-form>
            <custom-form :ref="formFlag + 'CustomForm'" v-else-if='formFlag === "password"' :form='passwordForm'
                         :form-options='passwordFormOptions' :form-style-options='formStyleOptions'></custom-form>
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
                baseForm: {
                    username: '',
                    avatar: '',
                    email: '',
                    address: '',
                    telephone: ''
                },
                baseFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: '用户名',
                        enName: 'username',
                        clearable: true
                    },
                    {
                        elType: 'el-avatar',
                        zhName: '头像',
                        enName: 'avatar',
                        clearable: true
                    },
                    {
                        elType: 'el-input',
                        zhName: '电子邮箱',
                        enName: 'email',
                        clearable: true
                    },
                    {
                        elType: 'el-input',
                        zhName: '住址',
                        enName: 'address',
                        clearable: true
                    },
                    {
                        elType: 'el-input',
                        zhName: '联系方式',
                        enName: 'telephone',
                        clearable: true
                    },
                    {
                        elType: 'el-buttons',
                        options: [
                            {
                                zhName: '重置',
                            },
                            {
                                zhName: '确定',
                                type: 'primary',
                                valid: true
                            },
                        ]
                    }
                ],
                baseRuleOptions: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ]
                },
                passwordForm: {},
                passwordFormOptions: [],
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
            crudBtn(zhName) {
                if (zhName === '重置') {
                    this.$refs[this.formFlag + 'CustomForm'].resetFields();
                }
            },
            getUserInfoFunc() {
                this.$axios.get('/boot/sys/sysUser/myInfo').then(res => {
                    if (res.data.success) {
                        this.baseForm = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
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

            .el-form {
                width: 400px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
