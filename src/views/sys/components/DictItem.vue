<template>
    <div class='dict-item'>
        <crud-container :loading='loading'
                        :rule-options='ruleOptions'
                        :search-form='searchForm'
                        :search-form-options='searchFormOptions'
                        :table-data='tableData'
                        :crud-form='crudForm'
                        :crud-form-options='crudFormOptions'
                        :column-options='columnOptions'
                        :table-style-options='tableStyleOptions'
                        :dialog='dialog'
                        :page='page'
                        @crud='crudBtn'
                        @dialog='dialogBtn'
                        @current-change='currentChangeBtn'
                        @selection-change='selectionChangeBtn'>
        </crud-container>
    </div>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'DictItem',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                ruleOptions: {
                    itemText: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    itemValue: [
                        {required: true, message: '请输入数据值', trigger: 'blur'}
                    ]
                },
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                sysDictId: '', // SysDict的ID，必传
                searchForm: {},
                tableData: [],
                selectionTableData: [],
                crudForm: {},
                crudFormOptions: {
                    '新增': [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'itemText',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '数据值',
                            enName: 'itemValue',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '描述',
                            enName: 'description',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '排序',
                            enName: 'orderNum',
                            clearable: true
                        }
                    ],
                    '编辑': [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'itemText',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '数据值',
                            enName: 'itemValue',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '描述',
                            enName: 'description',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '排序',
                            enName: 'orderNum',
                            clearable: true
                        }
                    ]
                },
                searchFormOptions: [
                    [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'itemText',
                            placeholder: '请输入名称',
                            clearable: true,
                            style(enName) {
                                return 'width: 130px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '数据值',
                            enName: 'itemValue',
                            placeholder: '请输入数据值',
                            clearable: true,
                            style(enName) {
                                return 'width: 130px';
                            }
                        },
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '查询',
                            type: 'primary'
                        }
                    ],
                    [
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '重置',
                            type: ''
                        },
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '新增',
                            type: 'primary',
                            plain: true
                        },
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '批量删除',
                            type: 'danger',
                            plain: true
                        }
                    ]
                ],
                columnOptions: [
                    [
                        {
                            zhName: '名称',
                            enName: 'itemText',
                        },
                        {
                            zhName: '数据值',
                            enName: 'itemValue',
                        }
                    ],
                    [
                        {
                            zhName: '编辑'
                        },
                        {
                            zhName: '删除'
                        }
                    ]
                ],
                tableStyleOptions: {
                    selection: true
                },
                dialog: {
                    zhName: '',
                    show: false
                }
            };
        },
        methods: {
            crudBtn(zhName, row) {
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '重置') {
                    this.searchForm = {};
                    this.page = {
                        pageSize: 10,
                        currentPage: 1,
                        total: 0
                    };
                    this.searchFunc();
                } else {
                    if (zhName === '新增') {
                        this.crudForm = {};
                    } else if (zhName === '批量删除') {
                        if (!this.selectionTableData.length) {
                            this.$message.warning('请先选择数据');
                            return;
                        }
                    } else {
                        this.crudForm = row;
                    }
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                }
            },
            dialogBtn(zhName) {
                if (zhName === '新增') {
                    this.addFunc();
                } else if (zhName === '编辑') {
                    this.editFunc();
                } else if (zhName === '删除') {
                    this.deleteFunc(this.crudForm.id);
                } else if (zhName === '批量删除') {
                    this.deleteFunc(this.selectionTableData.map(item => item.id).join(','));
                }
            },
            currentChangeBtn(currentPage) {
                this.page.currentPage = currentPage;
                this.searchFunc();
            },
            selectionChangeBtn(val) {
                this.selectionTableData = val;
            },
            searchFunc(sysDictId) {
                sysDictId && (this.sysDictId = sysDictId);
                !this.loading.show && (this.loading.show = true);
                let params = Object.assign({}, this.searchForm);
                params.currentPage = this.page.currentPage;
                params.pageSize = this.page.pageSize;
                params.sysDictId = this.sysDictId;
                this.$axios.get('/boot/sys/sysDictItem/page', {params: params}).then(res => {
                    if (res.data.success) {
                        this.tableData = res.data.result.records;
                        this.page.total = res.data.result.total;
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                }).finally(() => {
                    this.loading.show && (this.loading.show = false);
                });
            },
            addFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let params = Object.assign({}, this.crudForm);
                params.sysDictId = this.sysDictId;
                this.$axios.post('/boot/sys/sysDictItem/save', params).then(res => {
                    if (res.data.success) {
                        this.$message.success('添加成功');
                        this.searchFunc();
                    } else {
                        this.loading.show = false;
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
                });
            },
            editFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let params = Object.assign({}, this.crudForm);
                params.sysDictId = this.sysDictId;
                this.$axios.put('/boot/sys/sysDictItem/update', params).then(res => {
                    if (res.data.success) {
                        this.$message.success('修改成功');
                        this.searchFunc();
                    } else {
                        this.loading.show = false;
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
                });
            },
            deleteFunc(param) {
                this.dialog.show = false;
                this.loading.show = true;
                this.$axios.delete('/boot/sys/sysDictItem/delete', {params: {ids: param}}).then(res => {
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

<style lang='scss' scoped>

    .dict-item {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0 5px;
        box-sizing: border-box;
    }

</style>
