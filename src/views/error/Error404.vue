<template>
    <div class="error">
        <img :src='require("@/assets/error404.jpg")' alt=''/>
    </div>
</template>

<script>
    export default {
        name: 'Error'
    };
</script>

<style lang="scss" scoped>
    .error {
        position: relative;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }

</style>
