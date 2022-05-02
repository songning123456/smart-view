<template>
    <div class='websocket'>
        <div class='websocket-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchFormOptions'
                         :form-style-options='searchFormStyleOptions'></custom-form>
        </div>
        <div class='websocket-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchForm2Options'
                         :form-style-options='searchFormStyleOptions'
                         :rule-options='searchRule2Options' @crud='crudBtn'></custom-form>
        </div>
        <div class='websocket-frame-ud-content'>
            <custom-form :form='resForm' :form-options='resFormOptions'
                         :form-style-options='searchFormStyleOptions'></custom-form>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import appWebsocket from '@/utils/appWebsocket';
    import {dictItem} from '@/utils/sysDict';
    import websocket from '@/utils/appWebsocket';

    export default {
        name: 'Websocket',
        components: {CustomForm},
        data() {
            return {
                appWebsocket,
                searchForm: {
                    pushType: '',
                    reqData: ''
                },
                resForm: {
                    resData: ''
                },
                searchFormOptions: [
                    {
                        elType: 'el-select',
                        zhName: 'WS推送用户',
                        enName: 'pushType',
                        options: []
                    },
                ],
                searchForm2Options: [
                    {
                        elType: 'el-input',
                        zhName: '请求内容',
                        enName: 'reqData',
                        clearable: true,
                        placeholder: '请输入请求内容',
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
                            return 'width: 400px';
                        }
                    },
                ],
                searchFormStyleOptions: {
                    inline: true,
                    size: 'small',
                    labelWidth: '95px'
                },
                searchRule2Options: {
                    reqData: [
                        {required: true, message: '请输入请求内容', trigger: 'blur'}
                    ]
                },
            };
        },
        created() {
            dictItem('WSPushUsers').then(result => {
                this.searchFormOptions[0].options = result.map(option => {
                    return {
                        label: option.itemText,
                        value: option.itemValue
                    };
                });
                this.searchForm.pushType = this.searchFormOptions[0].options[0].value;
            });
        },
        mounted() {
            // 订阅事件
            this.$bus.$on('websocket', (data) => {
                this.resForm.resData = data;
            });
        },
        methods: {
            crudBtn(zhName) {
                if (zhName === '发送') {
                    let params = {
                        uuid: websocket.uuid,
                        time: websocket.time,
                        reqData: this.searchForm.reqData,
                        pushType: this.searchForm.pushType,
                        component: 'websocket'
                    };
                    this.$axios.get('/boot/websocket/send', {params: params}).then(res => {
                        if (res.data.success) {
                            // 这里使用websocket接收，所以忽略此处结果
                            // this.resForm.reqData = res.data.result;
                            this.searchForm.reqData = '';
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }).catch(e => {
                        this.$message.error(e);
                    });
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

    .websocket {
        position: relative;
        width: 100%;
        height: 100%;

        .websocket-frame-ud-form {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
        }

        .websocket-frame-ud-content {
            width: 100%;
            height: calc(100% - 100px);
            padding-top: 20px;
            box-sizing: border-box;
        }
    }

</style>
