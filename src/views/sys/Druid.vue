<template>
    <div class='druid'>
        <iframe width='1070px' height='566px' :src='iframeSrc'></iframe>
    </div>
</template>

<script>
    export default {
        name: 'Druid',
        computed: {
            iframeSrc() {
                return window.location.origin + '/boot/druid/index.html';
            }
        }
    };
</script>

<style lang='scss' scoped>
    .druid {
        width: 100%;
        height: 100%;
    }

</style>
