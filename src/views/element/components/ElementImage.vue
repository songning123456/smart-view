<template>
    <div class='element-image'>
        <el-image :src='source'></el-image>
    </div>
</template>

<script>
    export default {
        name: 'ElementImage',
        props: {
            source: {
                type: String,
                default() {
                    return '';
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

    .element-image {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
