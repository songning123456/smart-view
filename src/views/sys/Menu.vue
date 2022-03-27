<template>
    <crud-container :search-form-options='searchFormOptions' @click='clickBtn'></crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'Menu',
        components: {CrudContainer},
        data() {
            return {
                searchForm: {},
                searchFormOptions: [
                    [
                        {
                            elType: 'el-button',
                            zhName: '查询',
                            btnType: 'primary'
                        },
                        {
                            elType: 'el-button',
                            zhName: '新增',
                            btnType: 'primary'
                        }
                    ]
                ]
            };
        },
        created() {

        },
        methods: {
            clickBtn(zhName) {
                if (zhName === '查询') {

                }
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
