<template>
    <div class='crud-container' v-loading='loading.show'>
        <div class='crud-container-frame-ud-form' v-for='(searchFormOption, index) in searchFormOptions' :key='index'>
            <custom-form :form='searchForm' :form-options='searchFormOption' @crud='crudBtn'></custom-form>
        </div>
        <div class='crud-container-frame-ud-table' :style="'height: calc((100% - ' + (searchFormOptions.length + 1) * 60 + 'px))'">
            <custom-table ref='customTable' :result='searchResult' :column-options='columnOptions'
                          :operation-options='operationOptions' :table-style='tableStyle'
                          @crud='crudBtn' @selection-change='selectionChangeBtn'></custom-table>
        </div>
        <div class='crud-container-frame-ud-pagination'>
            <el-pagination background layout='total,prev,pager,next' :current-page.sync='page.currentPage'
                           :page-size="page.pageSize" :total='page.total'
                           @current-change="currentChangeBtn"></el-pagination>
        </div>
        <crud-dialog :dialog='dialog' :form='dialogForm' :form-options='dialogFormOptions'
                     @dialog='dialogBtn' @select-change='selectChangeBtn'></crud-dialog>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import CustomTable from '@/components/crud/CustomTable';
    import CrudDialog from '@/components/crud/CrudDialog';

    export default {
        name: 'CrudContainer',
        components: {CrudDialog, CustomTable, CustomForm},
        props: {
            loading: {
                type: Object,
                default() {
                    return {show: false};
                }
            },
            searchForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            searchFormOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            addForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            addFormOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            editForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            editFormOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            searchResult: {
                type: Array,
                default() {
                    return [];
                }
            },
            columnOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            operationOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            page: {
                type: Object,
                default() {
                    return {};
                }
            },
            dialog: {
                type: Object,
                default() {
                    return {
                        zhName: '未知',
                        show: false
                    };
                }
            },
            tableStyle: {
                type: Object,
                default() {
                    return {
                        selection: true
                    };
                }
            }
        },
        computed: {
            dialogForm() {
                if (this.dialog.zhName === '新增') {
                    return this.addForm;
                } else if (this.dialog.zhName === '编辑') {
                    return this.editForm;
                }
            },
            dialogFormOptions() {
                if (this.dialog.zhName === '新增') {
                    return this.addFormOptions;
                } else if (this.dialog.zhName === '编辑') {
                    return this.editFormOptions;
                }
            }
        },
        methods: {
            crudBtn(zhName, row) {
                this.$emit('crud', zhName, row);
            },
            currentChangeBtn(currentPage) {
                this.$emit('current-change', currentPage);
            },
            dialogBtn(zhName) {
                this.$emit('dialog', zhName);
            },
            selectChangeBtn(key, val) {
                this.$emit('select-change', key, val);
            },
            selectionChangeBtn(val) {
                this.$emit('selection-change', val);
            },
            clearSelection() {
                this.$refs.customTable.clearSelection();
            }
        }
    };
</script>

<style lang='scss' scoped>
    .crud-container {
        width: 100%;
        height: 100%;

        .crud-container-frame-ud-form {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
        }

        .crud-container-frame-ud-table {
            width: 100%;
        }

        .crud-container-frame-ud-pagination {
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

    }

</style>
