<template>
    <div class='websocket'>
        <div class='websocket-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchFormOptions'
                         :form-style-options='searchFormStyleOptions'></custom-form>
        </div>
        <div class='websocket-frame-ud-content'></div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import appWebsocket from '@/utils/appWebsocket';
    import {dictItem} from '@/utils/sysDict';

    export default {
        name: 'Websocket',
        components: {CustomForm},
        data() {
            return {
                appWebsocket,
                searchForm: {
                    pushType: ''
                },
                searchFormOptions: [
                    {
                        elType: 'el-select',
                        zhName: 'WS推送用户',
                        enName: 'pushType',
                        clearable: true,
                        options: []
                    },
                ],
                searchFormStyleOptions: {
                    inline: true,
                    size: 'small'
                }
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
            height: calc(100% - 50px);

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
