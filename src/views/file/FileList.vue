<template>
    <crud-container :loading='loading'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :table-data='tableData'
                    :crud-form='crudForm'
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
                searchForm: {
                    fileType: 'file'
                },
                crudForm: {},
                tableData: [],
                searchFormOptions: [
                    [
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '查询',
                            type: 'primary'
                        }
                    ]
                ],
                columnOptions: [
                    [
                        {
                            zhName: '文件名称',
                            enName: 'fileName',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '修改时间',
                            enName: 'updateTime'
                        },
                    ],
                    [
                        {
                            zhName: '删除'
                        }
                    ]
                ],
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
        created() {
            this.searchFunc();
        },
        methods: {
            crudBtn(zhName, row) {
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '删除') {
                    this.crudForm = row;
                    (this.dialog.show = true) && (this.dialog.zhName = zhName);
                }
            },
            dialogBtn(zhName) {
                if (zhName === '删除') {
                    this.deleteFunc();
                }
            },
            searchFunc() {
                this.loading.show = true;
                let params = Object.assign({}, this.searchForm);
                this.$axios.get('/boot/file/fileList/list', {params: params}).then(res => {
                    if (res.data.success) {
                        this.tableData = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                }).finally(() => {
                    this.loading.show = false;
                });
            },
            deleteFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                this.$axios.delete('/boot/file/fileList/delete/' + this.crudForm.id).then(res => {
                    if (res.data.success) {
                        this.$message.success('删除成功');
                        this.searchFunc();
                    } else {
                        this.loading.show = false;
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
                });
            }
        }
    };
</script>

<style scoped>

</style>
