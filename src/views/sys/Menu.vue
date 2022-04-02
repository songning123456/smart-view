<template>
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
                    @crud='crudBtn'
                    @dialog='dialogBtn'></crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'Menu',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                ruleOptions: {
                    metaTitle: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],
                    orderNum: [
                        {required: true, message: '请填入排序号', trigger: 'blur'}
                    ]
                },
                searchForm: {},
                tableData: [],
                crudForm: {},
                crudFormOptions: {
                    '详情': [
                        {
                            elType: 'el-select',
                            zhName: '父级菜单',
                            enName: 'parentId',
                            clearable: true,
                            disabled: true,
                            options: []
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单名称',
                            enName: 'metaTitle',
                            clearable: true,
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '图标',
                            enName: 'metaIcon',
                            clearable: true,
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单URL',
                            enName: 'path',
                            clearable: true,
                            disabled: true
                        },
                        {
                            elType: 'el-input-number',
                            zhName: '排序号',
                            enName: 'orderNum',
                            min: 0,
                            disabled: true
                        }
                    ],
                    '新增': [
                        {
                            elType: 'el-select',
                            zhName: '父级菜单',
                            enName: 'parentId',
                            clearable: true,
                            options: []
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单名称',
                            enName: 'metaTitle',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '图标',
                            enName: 'metaIcon',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单URL',
                            enName: 'path',
                            clearable: true
                        },
                        {
                            elType: 'el-input-number',
                            zhName: '排序号',
                            enName: 'orderNum',
                            min: 0
                        }
                    ],
                    '编辑': [
                        {
                            elType: 'el-select',
                            zhName: '父级菜单',
                            enName: 'parentId',
                            clearable: true,
                            options: []
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单名称',
                            enName: 'metaTitle',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '图标',
                            enName: 'metaIcon',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '菜单URL',
                            enName: 'path',
                            clearable: true
                        },
                        {
                            elType: 'el-input-number',
                            zhName: '排序号',
                            enName: 'orderNum',
                            min: 0
                        }
                    ]
                },
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
                            btnType: 'primary',
                            plain: true
                        }
                    ]
                ],
                columnOptions: [
                    [
                        {
                            zhName: '名称',
                            enName: 'metaTitle'
                        },
                        {
                            zhName: '图标',
                            enName: 'metaIcon'
                        },
                        {
                            zhName: '菜单URL',
                            enName: 'path'
                        }
                    ],
                    [
                        {
                            zhName: '详情'
                        },
                        {
                            zhName: '编辑'
                        },
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
                } else {
                    if (zhName === '新增') {
                        this.crudForm = {
                            type: 0
                        };
                    } else {
                        this.crudForm = row;
                    }
                    (this.dialog.show = true) && (this.dialog.zhName = zhName);
                }
            },
            dialogBtn(zhName) {
                if (zhName === '新增') {
                    this.addFunc();
                } else if (zhName === '编辑') {
                    this.editFunc();
                } else if (zhName === '删除') {
                    this.deleteFunc();
                }
            },
            searchFunc() {
                !this.loading.show && (this.loading.show = true);
                let params = Object.assign({}, this.searchForm);
                this.$axios.get('/boot/sys/sysMenu/list', params).then(res => {
                    if (res.data.success) {
                        this.tableData = res.data.result;
                        let optionArr = [];
                        let childDepth = 0;
                        this.forEachTree(this.tableData, optionArr, childDepth);
                        Object.values(this.crudFormOptions).forEach(val => {
                            if (val[0] && val[0].options) {
                                val[0].options = optionArr;
                            }
                        });
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
                this.$axios.post('/boot/sys/sysMenu/save', this.crudForm).then(res => {
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
                this.$axios.put('/boot/sys/sysMenu/update', this.crudForm).then(res => {
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
            deleteFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                this.$axios.delete('/boot/sys/sysMenu/delete/' + this.crudForm.id).then(res => {
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
            },
            forEachTree(tableData, optionArr, childDepth) {
                let line = '';
                for (let i = 0; i < childDepth; i++) {
                    line += '-';
                }
                line += ' ';
                for (let item of tableData) {
                    if (item.type !== 2) {
                        let obj = {
                            alias: line + item.metaTitle,
                            label: item.metaTitle,
                            value: item.id
                        };
                        optionArr.push(obj);
                        this.forEachTree(item.children, optionArr, childDepth + 1);
                    } else {
                        return;
                    }
                }
                childDepth++;
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
