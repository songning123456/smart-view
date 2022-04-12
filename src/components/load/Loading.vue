<template>
    <div class='loading' v-show='loading'>
        <img :src="require('@/assets/spinner.gif')" alt=''>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style lang='scss' scoped>

    .loading {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.2);

        img {
            top: 0;
            left: 0;
            right: 0;
            bottom: 3rem;
            margin: auto;
            position: absolute;
        }

    }

</style>
