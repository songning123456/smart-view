<template>
    <div class='ssh'>
        <div class='ssh-frame-ud-form'>
            <custom-form :form='sendForm' :form-options='sendFormOptions' :form-style-options='sendFormStyleOptions'
                         :rule-options='sendFormRuleOptions' @crud='crudBtn'></custom-form>
        </div>
        <div class='ssh-frame-ud-content'></div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';

    export default {
        name: 'SSH',
        components: {CustomForm},
        data() {
            return {
                sendForm: {
                    ip: '',
                    port: 22,
                    username: '',
                    password: ''
                },
                sendFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: 'IP地址',
                        enName: 'ip',
                        clearable: true,
                        placeholder: 'e.g: 127.0.0.1',
                        style() {
                            return 'width: 150px';
                        }
                    },
                    {
                        elType: 'el-input-number',
                        zhName: '端口号',
                        enName: 'port',
                        min: 1,
                        max: 65535,
                    },
                    {
                        elType: 'el-input',
                        zhName: '用户名',
                        enName: 'username',
                        clearable: true,
                        placeholder: '请输入用户名',
                        style() {
                            return 'width: 150px';
                        }
                    },
                    {
                        elType: 'el-input',
                        zhName: '密码',
                        enName: 'password',
                        showPassword: true,
                        clearable: true,
                        placeholder: '请输入密码',
                        style() {
                            return 'width: 150px';
                        }
                    },
                    {
                        elType: 'el-button',
                        noLabel: true,
                        zhName: 'send',
                        type: 'primary'
                    },
                ],
                sendFormStyleOptions: {
                    inline: true,
                    size: 'small'
                },
                sendFormRuleOptions: {
                    ip: [
                        {required: true, message: '请输入IP', trigger: 'blur'}
                    ],
                    port: [
                        {required: true, message: '请输入端口号', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            crudBtn(zhName) {
                if (zhName === 'send') {
                    this.$message.success('send');
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    .ssh {
        width: 100%;
        height: 100%;

        .ssh-frame-ud-form {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
        }

        .ssh-frame-ud-content {
            width: 100%;
            height: calc(100% - 50px);

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
