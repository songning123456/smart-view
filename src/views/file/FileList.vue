<template>
    <crud-container :loading='loading'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :table-data='tableData'
                    :crud-form='crudForm'
                    :crud-form-options='crudFormOptions'
                    :column-options='columnOptions'
                    :table-style-options='tableStyleOptions'
                    :dialog='dialog'
                    @crud='crudBtn'
                    @dialog='dialogBtn'></crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'FileList',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                searchForm: {},
                tableData: [],
                crudFormOptions: {},
                searchFormOptions: [],
                columnOptions: [],
                tableStyleOptions: {
                    rowKey: 'id',
                    defaultExpandAll: true,
                    selection: false
                },
                dialog: {
                    zhName: '',
                    show: false
                }
            };
        },
        methods: {
            crudBtn(zhName, row) {
            },
            dialogBtn(zhName) {
            }
        }
    };
</script>

<style scoped>

</style>
