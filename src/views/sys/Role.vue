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
                    :page='page'
                    @crud='crudBtn'
                    @dialog='dialogBtn'
                    @current-change='currentChangeBtn'
                    @selection-change='selectionChangeBtn'>
        <template v-slot>
            <el-tree ref='elTree' :data='menuData' show-checkbox :default-expand-all=true
                     node-key='id' :check-strictly=true :props="{children: 'children', label: 'metaTitle'}">
            </el-tree>
        </template>
    </crud-container>
</template>

<script>

    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'Role',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                ruleOptions: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请填入唯一编码', trigger: 'blur'}
                    ]
                },
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                searchForm: {},
                tableData: [],
                selectedMenuDataIds: [],
                menuData: [],
                selectionTableData: [],
                crudForm: {},
                crudFormOptions: {
                    '详情': [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'name',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '唯一编码',
                            enName: 'code',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '备注',
                            enName: 'remark',
                            disabled: true
                        }
                    ],
                    '新增': [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'name',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '唯一编码',
                            enName: 'code',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '备注',
                            enName: 'remark',
                            clearable: true
                        }
                    ],
                    '编辑': [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'name',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '唯一编码',
                            enName: 'code',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '备注',
                            enName: 'remark',
                            clearable: true
                        }
                    ]
                },
                searchFormOptions: [
                    [
                        {
                            elType: 'el-input',
                            zhName: '名称',
                            enName: 'name',
                            placeholder: '请输入名称',
                            clearable: true
                        },
                        {
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '查询',
                            type: 'primary'
                        },
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
                            zhName: '序号',
                            enName: 'index',
                            width: '70px'
                        },
                        {
                            zhName: '名称',
                            enName: 'name'
                        },
                        {
                            zhName: '编码',
                            enName: 'code'
                        },
                        {
                            zhName: '备注',
                            enName: 'remark'
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
                        },
                        {
                            zhName: '分配菜单'
                        }
                    ]
                ],
                tableStyleOptions: {
                    selection: true
                },
                dialog: {
                    zhName: '',
                    slot: false,
                    show: false
                }
            };
        },
        created() {
            this.searchFunc();
            this.getAllMenuFunc();
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
                    } else if (zhName === '分配菜单') {
                        this.crudForm = row;
                        this.dialog.slot = true;
                        this.getMenuOfRoleFunc(row.id);
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
                } else if (zhName === '分配菜单') {
                    this.addMenuFunc(this.crudForm.id);
                }
            },
            currentChangeBtn(currentPage) {
                this.page.currentPage = currentPage;
                this.searchFunc();
            },
            selectionChangeBtn(val) {
                this.selectionTableData = val;
            },
            searchFunc() {
                !this.loading.show && (this.loading.show = true);
                let params = Object.assign({}, this.searchForm);
                params.currentPage = this.page.currentPage;
                params.pageSize = this.page.pageSize;
                this.$axios.get('/boot/sys/sysRole/page', {params: params}).then(res => {
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
                this.$axios.post('/boot/sys/sysRole/save', this.crudForm).then(res => {
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
                this.$axios.put('/boot/sys/sysRole/update', this.crudForm).then(res => {
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
                this.$axios.delete('/boot/sys/sysRole/delete', {params: {ids: param}}).then(res => {
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
            getAllMenuFunc() {
                this.$axios.get('/boot/sys/sysMenu/list', {}).then(res => {
                    if (res.data.success) {
                        this.menuData = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            getMenuOfRoleFunc(id) {
                this.$axios.get('/boot/sys/sysRole/info/' + id).then(res => {
                    if (res.data.success) {
                        if (Array.isArray(res.data.result.menuIds)) {
                            this.selectedMenuDataIds = res.data.result.menuIds;
                            this.$refs['elTree'].setCheckedKeys(this.selectedMenuDataIds);
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            addMenuFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let menuIds = this.$refs['elTree'].getCheckedKeys();
                this.$axios.post('/boot/sys/sysRole/menu/' + this.crudForm.id, menuIds).then(res => {
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
            }
        }
    };
</script>

<style lang='scss' scoped></style>
