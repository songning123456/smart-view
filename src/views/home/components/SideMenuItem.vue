<template>
    <el-menu-item></el-menu-item>
</template>

<script>
    export default {
        name: 'SideMenuItem',
        props: {
            menuList: {
                type: Array,
                default() {
                    return [];
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
