<template>
    <div class='crud-container'>
        <div class='crud-container-frame-ud-form' v-for='(searchFormOption, index) in searchFormOptions' :key='index'>
            <custom-form :form='searchForm' :form-options='searchFormOption'
                         :form-style-options='customFormStyleOptions[true]'
                         @crud='crudBtn' @http-request='httpRequestBtn'></custom-form>
        </div>
        <div class='crud-container-frame-ud-table'
             :style="'height: calc((100% - ' + (searchFormOptions.length + (Object.keys(page).length ? 1 : 0)) * 50 + 'px))'">
            <custom-table ref='customTable' :table-data='tableData' :column-options='columnOptions'
                          :table-style-options='tableStyleOptions'
                          @crud='crudBtn' @selection-change='selectionChangeBtn'></custom-table>
        </div>
        <div class='crud-container-frame-ud-pagination' v-if='Object.keys(page).length'>
            <el-pagination background layout='total,prev,pager,next' :current-page.sync='page.currentPage'
                           :page-size="page.pageSize" :total='page.total'
                           @current-change="currentChangeBtn"></el-pagination>
        </div>
        <crud-dialog :dialog='dialog' :rule-options='ruleOptions' :form='crudForm'
                     :form-options='crudFormOptions[dialog.zhName]' :form-style-options='customFormStyleOptions[false]'
                     @dialog='dialogBtn'>
            <template v-slot>
                <slot></slot>
            </template>
        </crud-dialog>
        <slot name='custom'></slot>
        <loading :loading='loading.show'></loading>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';
    import CustomTable from '@/components/crud/CustomTable';
    import CrudDialog from '@/components/crud/CrudDialog';
    import Loading from '@/components/load/Loading';

    export default {
        name: 'CrudContainer',
        components: {Loading, CrudDialog, CustomTable, CustomForm},
        props: {
            loading: {
                type: Object,
                default() {
                    return {show: false};
                }
            },
            ruleOptions: {
                type: Object,
                default() {
                    return {};
                }
            },
            searchForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            crudForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            tableData: {
                type: Array,
                default() {
                    return [];
                }
            },
            searchFormOptions: {
                type: Array,
                default() {
                    return [];
                }
            },
            crudFormOptions: {
                type: Object,
                default() {
                    return {};
                }
            },
            formStyleOptions: {
                type: Object,
                default() {
                    return {
                        true: {
                            inline: true,
                            size: 'small'
                        },
                        false: {
                            inline: false,
                            size: 'small',
                            labelWidth: '100px'
                        }
                    };
                }
            },
            tableStyleOptions: {
                type: Object,
                default() {
                    return {
                        defaultExpandAll: false,
                        selection: true
                    };
                }
            },
            columnOptions: {
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
            }
        },
        computed: {
            customFormStyleOptions() {
                let resOptions = {
                    true: {
                        inline: true,
                        size: 'small'
                    },
                    false: {
                        inline: false,
                        size: 'small',
                        labelWidth: '100px'
                    }
                };
                if (this.formStyleOptions[true]) {
                    resOptions[true] = this.formStyleOptions[true];
                }
                if (this.formStyleOptions[false]) {
                    resOptions[false] = this.formStyleOptions[false];
                }
                return resOptions;
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
            selectionChangeBtn(val) {
                this.$emit('selection-change', val);
            },
            httpRequestBtn(file) {
                this.$emit('http-request', file);
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
            height: 50px;
            display: flex;
            align-items: center;
        }

        .crud-container-frame-ud-table {
            width: 100%;
        }

        .crud-container-frame-ud-pagination {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

    }

</style>
