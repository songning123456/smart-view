<template>
    <crud-container :loading='loading'
                    :rule-options='ruleOptions'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :search-result='searchResult'
                    :add-form='addForm'
                    :add-form-options='addFormOptions'
                    :column-options='columnOptions'
                    :operation-options='operationOptions'
                    :table-style-options='tableStyleOptions'
                    :dialog='dialog'
                    @crud='crudBtn'></crud-container>
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
                    orderNum: [
                        {required: true, message: '请填入排序号', trigger: 'blur'}
                    ]
                },
                searchForm: {},
                searchResult: [],
                addForm: {
                    type: 0
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
                addFormOptions: [
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
            crudBtn(zhName) {
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '新增') {
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                }
            },
            searchFunc() {
                this.loading.show = true;
                this.$axios.get('/boot/sys/sysMenu/list').then(res => {
                    this.searchResult = res.data.result;
                    let optionArr = [];
                    let childDepth = 0;
                    this.forEachTree(this.searchResult, optionArr, childDepth);
                    this.addFormOptions[0].options = optionArr;
                }).finally(() => {
                    this.loading.show = false;
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
