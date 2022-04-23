<template>
    <div class='websocket'></div>
</template>

<script>
    import appWebsocket from '@/utils/appWebsocket';

    export default {
        name: 'Websocket',
        data() {
            return {
                appWebsocket
            };
        },
        created() {
            // 测试使用，后续修改
            setTimeout(() => {
                appWebsocket.send({component: 'test'});
            }, 3000);
        }
    };
</script>

<style lang='scss' scoped>

    .websocket {
        width: 100%;
        height: 100%;
    }

</style>
