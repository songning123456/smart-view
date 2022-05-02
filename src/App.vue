<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import appWebsocket from '@/utils/appWebsocket';

    export default {
        name: 'App',
        data() {
            return {
                appWebsocket
            };
        },
        created() {
            appWebsocket.message = this.message;
        },
        methods: {
            message(data) {
                let wsData = JSON.parse(data);
                // 发布事件
                this.$bus.$emit(wsData.component, wsData.data);
            }
        }
    };

</script>

<style>
    html, body, #app {
        font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0;
        margin: 0;
        font-size: 15px;
    }
</style>
