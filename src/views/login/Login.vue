<template>
    <div class='login' :style="{'background-image': `url(${require('@/assets/login.jpg')})`}">
        <div class='login-form'>
            <custom-form :form='form' :form-options='formOptions' :form-style-options='formStyleOptions'
                         :rule-options='ruleOptions' @crud='crudBtn'></custom-form>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import qs from 'qs';

    export default {
        name: 'Login',
        components: {CustomForm},
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    code: '',
                    token: '',
                    captchaImg: ''
                },
                formOptions: [
                    {
                        elType: 'el-input',
                        zhName: '用户名',
                        enName: 'username',
                        clearable: true
                    },
                    {
                        elType: 'el-input',
                        zhName: '密码',
                        enName: 'password',
                        clearable: true,
                        type: 'password'
                    },
                    {
                        elType: 'el-input',
                        zhName: '验证码',
                        enName: 'code',
                        clearable: true
                    },
                    {
                        elType: 'el-image',
                        noLabel: true,
                        enName: 'captchaImg'
                    },
                    {
                        elType: 'el-button',
                        noLabel: true,
                        zhName: '登录',
                        type: 'primary',
                        valid: true
                    }
                ],
                formStyleOptions: {
                    inline: false,
                    labelWidth: '80px'
                },
                ruleOptions: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 5, max: 5, message: '长度为5个字符', trigger: 'blur'}
                    ],
                },
            };
        },
        created() {
            this.getCaptchaFunc();
        },
        methods: {
            crudBtn(zhName) {
                if (zhName === 'captchaImg') {
                    this.getCaptchaFunc();
                } else if (zhName === '登录') {
                    this.loginFunc();
                }
            },
            loginFunc() {
                let params = {
                    username: this.form.username,
                    password: this.form.password,
                    token: this.form.token,
                    code: this.form.code
                };
                this.$axios.post('/boot/login?' + qs.stringify(params)).then(res => {
                    let jwt = res.headers['authorization'];
                    this.$store.commit('setToken', jwt);
                    this.$router.push('/index');
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            getCaptchaFunc() {
                this.$axios.get('/boot/auth/captcha').then(res => {
                    if (res.data.success) {
                        this.form.token = res.data.result.token;
                        this.form.captchaImg = res.data.result.captchaImg;
                        this.form.code = '';
                    } else {
                        this.$message.error('获取验证码失败');
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            }
        }
    };
</script>

<style lang='scss' scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .login-form {
            position: absolute;
            width: 300px;
            height: 240px;
            top: 50%;
            left: 45%;

            /deep/ .el-button {
                width: 220px;
            }

            /deep/ .el-form-item__label::before {
                content: unset;
            }
        }
    }
</style>
