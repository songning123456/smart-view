<template>
    <div class='ssh'>
        <div class='ssh-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchFormOptions'
                         :form-style-options='searchFormStyleOptions'
                         :rule-options='searchRuleOptions' @crud='crudBtn'></custom-form>
        </div>
        <div class='ssh-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchForm2Options'
                         :form-style-options='searchFormStyleOptions'
                         :rule-options='searchRule2Options' @crud='crudBtn'></custom-form>
        </div>
        <div class='ssh-frame-ud-content'>
            <custom-form :form='resForm' :form-options='resFormOptions'
                         :form-style-options='searchFormStyleOptions' @crud='crudBtn'></custom-form>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import appWebsocket from '@/utils/appWebsocket';
    import crypto from '@/utils/crypto';
    import {isIP} from '@/utils/validate';

    export default {
        name: 'SSH',
        components: {CustomForm},
        data() {
            return {
                searchForm: {
                    remoteIp: '',
                    remotePort: 22,
                    remoteUsername: '',
                    remotePassword: '',
                    command: ''
                },
                resForm: {
                    resData: ''
                },
                searchFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: 'IP地址',
                        enName: 'remoteIp',
                        clearable: true,
                        placeholder: 'e.g: 127.0.0.1',
                        style() {
                            return 'width: 150px';
                        }
                    },
                    {
                        elType: 'el-input-number',
                        zhName: '端口号',
                        enName: 'remotePort',
                        min: 1,
                        max: 65535,
                    },
                    {
                        elType: 'el-input',
                        zhName: '用户名',
                        enName: 'remoteUsername',
                        clearable: true,
                        placeholder: '请输入用户名',
                        style() {
                            return 'width: 150px';
                        }
                    },
                    {
                        elType: 'el-input',
                        zhName: '密码',
                        enName: 'remotePassword',
                        showPassword: true,
                        clearable: true,
                        placeholder: '请输入密码',
                        style() {
                            return 'width: 150px';
                        }
                    }
                ],
                searchForm2Options: [
                    {
                        elType: 'el-input',
                        zhName: '命令',
                        enName: 'command',
                        clearable: true,
                        placeholder: '请输入命令',
                        style() {
                            return 'width: 400px';
                        }
                    },
                    {
                        elType: 'el-button',
                        noLabel: true,
                        zhName: '发送',
                        type: 'primary'
                    },
                ],
                resFormOptions: [
                    {
                        elType: 'el-input',
                        zhName: '响应结果',
                        enName: 'resData',
                        type: 'textarea',
                        readonly: true,
                        rows: 15,
                        style() {
                            return 'width: 900px';
                        }
                    },
                    {
                        elType: 'el-button',
                        zhName: '清空',
                        noLabel: true,
                        type: 'primary',
                        plain: true
                    }
                ],
                searchFormStyleOptions: {
                    inline: true,
                    size: 'small',
                    labelWidth: '80px'
                },
                searchRuleOptions: {
                    remoteIp: [
                        {required: true, message: '请输入IP', trigger: 'blur'}
                    ],
                    remotePort: [
                        {required: true, message: '请输入端口号', trigger: 'blur'}
                    ],
                    remoteUsername: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    remotePassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                searchRule2Options: {
                    command: [
                        {required: true, message: '请输入命令', trigger: 'blur'}
                    ]
                },
            };
        },
        mounted() {
            // 订阅事件
            this.$bus.$on('SSH', (data) => {
                this.resForm.resData = data;
            });
        },
        methods: {
            crudBtn(zhName) {
                if (zhName === '发送') {
                    for (let key in this.searchForm) {
                        if (!this.searchForm[key]) {
                            this.$message.warning('请按照格式输入请求参数！');
                            return;
                        }
                    }
                    if (this.searchForm.remoteIp && !isIP(this.searchForm.remoteIp)) {
                        this.$message.warning('请输入合法的IP！');
                        return;
                    }
                    let params = Object.assign({}, this.searchForm);
                    // 密码加密
                    params.remotePassword = crypto.aesEncrypt(this.searchForm.remotePassword, 'aaaabbbbccccdddd');
                    params.component = 'SSH';
                    appWebsocket.send(params);
                } else if (zhName === '清空') {
                    this.resForm.resData = '';
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
            height: calc(100% - 100px);
            padding-top: 20px;
            box-sizing: border-box;
        }
    }

</style>
