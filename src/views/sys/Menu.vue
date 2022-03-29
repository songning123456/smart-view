<template>
    <crud-container :loading='loading'
                    :rule-options='ruleOptions'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :table-data='searchResult'
                    :crud-form='crudForm'
                    :crud-form-options='crudFormOptions'
                    :column-options='columnOptions'
                    :operation-options='operationOptions'
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
                searchResult: [],
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
                            zhName: '权限编码',
                            enName: 'permission',
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
                            elType: 'el-radio-group',
                            zhName: '类型',
                            enName: 'type',
                            disabled: true,
                            options: [
                                {
                                    label: '目录',
                                    value: 0
                                },
                                {
                                    label: '菜单',
                                    value: 1
                                },
                                {
                                    label: '按钮',
                                    value: 2
                                }
                            ]
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
                            zhName: '权限编码',
                            enName: 'permission',
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
                            elType: 'el-radio-group',
                            zhName: '类型',
                            enName: 'type',
                            options: [
                                {
                                    label: '目录',
                                    value: 0
                                },
                                {
                                    label: '菜单',
                                    value: 1
                                },
                                {
                                    label: '按钮',
                                    value: 2
                                }
                            ]
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
                            zhName: '权限编码',
                            enName: 'permission',
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
                            elType: 'el-radio-group',
                            zhName: '类型',
                            enName: 'type',
                            options: [
                                {
                                    label: '目录',
                                    value: 0
                                },
                                {
                                    label: '菜单',
                                    value: 1
                                },
                                {
                                    label: '按钮',
                                    value: 2
                                }
                            ]
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
                            btnType: 'primary'
                        }
                    ]
                ],
                columnOptions: [
                    {
                        label: '名称',
                        prop: 'metaTitle'
                    },
                    {
                        label: '权限',
                        prop: 'permission'
                    },
                    {
                        label: '图标',
                        prop: 'metaIcon'
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        style(val) {
                            let prefix = 'color: ';
                            let colorVal = '#000000';
                            if (val === 0) {
                                colorVal = '#409eff';
                            } else if (val === 1) {
                                colorVal = '#67c23a';
                            } else if (val === 2) {
                                colorVal = '#909399';
                            }
                            return prefix + colorVal;
                        },
                        text(val) {
                            if (val === 0) {
                                return '目录';
                            } else if (val === 1) {
                                return '菜单';
                            } else if (val === 2) {
                                return '按钮';
                            } else {
                                return val;
                            }
                        }
                    },
                    {
                        label: '菜单URL',
                        prop: 'path'
                    }
                ],
                operationOptions: [
                    {
                        zhName: '详情'
                    },
                    {
                        zhName: '编辑'
                    },
                    {
                        zhName: '删除'
                    }
                ],
                tableStyleOptions: {
                    rowKey: 'id',
                    defaultExpandAll: true,
                    indexFlag: false,
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
                    this.deleteFunc();
                }
            },
            searchFunc() {
                this.loading.show = true;
                this.$axios.get('/boot/sys/sysMenu/list', this.searchForm).then(res => {
                    if (res.data.success) {
                        this.searchResult = res.data.result;
                        let optionArr = [];
                        let childDepth = 0;
                        this.forEachTree(this.searchResult, optionArr, childDepth);
                        Object.values(this.crudFormOptions).forEach(val => {
                            if (val[0] && val[0].options) {
                                val[0].options = optionArr;
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                    this.loading.show = false;
                }).catch(e => {
                    this.loading.show = false;
                    this.$message.error(e);
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
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.dialog.show = false;
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
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.dialog.show = false;
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
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.dialog.show = false;
                    this.loading.show = false;
                    this.$message.error(e);
                });
            },
            forEachTree(searchResult, optionArr, childDepth) {
                let line = '';
                for (let i = 0; i < childDepth; i++) {
                    line += '-';
                }
                line += ' ';
                for (let item of searchResult) {
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
