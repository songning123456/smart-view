<template>
    <div class='user-center' v-loading.show='loading.show'>
        <el-tabs v-model='formFlag'>
            <el-tab-pane label='修改基本信息' name='base'></el-tab-pane>
            <el-tab-pane label="修改密码信息" name='password'></el-tab-pane>
        </el-tabs>
        <div class='modify-user-form'>
            <custom-form v-if='formFlag === "base"' :form='baseForm'
                         :form-options='baseFormOptions'
                         :form-style-options='formStyleOptions' :rule-options='baseRuleOptions'
                         @crud='crudBtn'></custom-form>
            <custom-form :ref='this.formFlag + "CustomForm"' v-else-if='formFlag === "password"' :form='passwordForm'
                         :form-options='passwordFormOptions' :form-style-options='formStyleOptions'
                         :rule-options='passwordRuleOptions' @crud='crudBtn'></custom-form>
            <crud-dialog :dialog='dialog' @dialog='dialogBtn'></crud-dialog>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import CrudDialog from '@/components/crud/CrudDialog';

    export default {
        name: 'UserCenter',
        components: {CrudDialog, CustomForm},
        data() {
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formFlag: 'base',
                loading: {
                    show: false
                },
                dialog: {
                    show: false,
                    zhName: '修改密码'
                },
                baseForm: {},
                baseFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: '昵称',
                        enName: 'realname',
                        clearable: true
                    },
                    {
                        elType: 'el-avatar',
                        zhName: '头像',
                        enName: 'avatar',
                        size: 'small',
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
                    realname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ]
                },
                passwordForm: {},
                passwordFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: '当前密码',
                        enName: 'oldPassword',
                        clearable: true,
                        type: 'password'
                    },
                    {
                        elType: 'el-input',
                        zhName: '新密码',
                        enName: 'newPassword',
                        clearable: true,
                        type: 'password'
                    },
                    {
                        elType: 'el-input',
                        zhName: '确认密码',
                        enName: 'checkPassword',
                        clearable: true,
                        type: 'password'
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
                passwordRuleOptions: {
                    oldPassword: [
                        {required: true, message: '请输入当前密码', trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur'}
                    ],
                    checkPassword: [
                        {required: true, validator: validatePassword, trigger: 'blur'}
                    ]
                },
                formStyleOptions: {
                    inline: false,
                    labelWidth: '80px'
                },
            };
        },
        created() {
            this.getMyselfFunc();
        },
        methods: {
            crudBtn(zhName) {
                if (zhName === '重置') {
                    if (this.formFlag === 'base') {
                        this.getMyselfFunc();
                    } else if (this.formFlag === 'password') {
                        this.passwordForm = {};
                        this.$refs[this.formFlag + 'CustomForm'].$refs['elForm'].resetFields();
                    }
                } else if (zhName === '确定') {
                    if (this.formFlag === 'base') {
                        this.updateMyselfFunc();
                    } else if (this.formFlag === 'password') {
                        this.dialog.show = true;
                    }
                }
            },
            dialogBtn(zhName) {
                this.dialog.show = false;
                if (zhName === '修改密码') {
                    this.updatePasswordFunc();
                }
            },
            updatePasswordFunc() {
                this.loading.show = true;
                this.$axios.put('/boot/sys/sysUser/updatePassword', this.passwordForm).then(res => {
                    if (res.data.success) {
                        this.getMyselfFunc();
                        this.$message.success('修改成功');
                        this.formFlag = 'base';
                    } else {
                        this.loading.show = false;
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
                });
            },
            updateMyselfFunc() {
                this.loading.show = true;
                this.$axios.put('/boot/sys/sysUser/updateMyself', this.baseForm).then(res => {
                    if (res.data.success) {
                        this.getMyselfFunc();
                        this.$message.success('修改成功');
                    } else {
                        this.loading.show = false;
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
                });
            },
            getMyselfFunc() {
                this.loading.show = true;
                this.$axios.get('/boot/sys/sysUser/myInfo').then(res => {
                    if (res.data.success) {
                        this.baseForm = Object.assign({}, res.data.result);
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                }).finally(() => {
                    this.loading.show = false;
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
