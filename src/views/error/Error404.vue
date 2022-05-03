<template>
    <div class='error' :style="{'background-image': `url(${require('@/assets/background/error404.jpg')})`}">
        <el-button plain @click='clickBtn'>返回</el-button>
    </div>
</template>

<script>
    export default {
        name: 'Error',
        methods: {
            clickBtn() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .error {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        /deep/ .el-button {
            position: absolute;
            top: 5%;
            right: 5%;
        }
    }

</style>
