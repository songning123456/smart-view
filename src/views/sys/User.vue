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
            <el-tree ref='elTree' :data='roleData' show-checkbox :default-expand-all=true
                     node-key='id' :check-strictly=true :props="{children: 'children', label: 'name'}">
            </el-tree>
        </template>
    </crud-container>
</template>

<script>

    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'User',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                ruleOptions: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                searchForm: {},
                tableData: [],
                roleData: [],
                selectedRoleDataIds: [],
                selectionTableData: [],
                crudForm: {},
                crudFormOptions: {
                    '详情': [
                        {
                            elType: 'el-input',
                            zhName: '用户名',
                            enName: 'username',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '密码',
                            enName: 'password',
                            disabled: true
                        },
                        {
                            elType: 'el-avatar',
                            zhName: '头像',
                            enName: 'avatar',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '电子邮箱',
                            enName: 'email',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '住址',
                            enName: 'address',
                            disabled: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '联系方式',
                            enName: 'telephone',
                            disabled: true
                        }
                    ],
                    '新增': [
                        {
                            elType: 'el-input',
                            zhName: '用户名',
                            enName: 'username',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '密码',
                            enName: 'password',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '头像',
                            enName: 'avatar',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '电子邮箱',
                            enName: 'email',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '住址',
                            enName: 'address',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '联系方式',
                            enName: 'telephone',
                            clearable: true
                        }
                    ],
                    '编辑': [
                        {
                            elType: 'el-input',
                            zhName: '用户名',
                            enName: 'username',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '头像',
                            enName: 'avatar',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '电子邮箱',
                            enName: 'email',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '住址',
                            enName: 'address',
                            clearable: true
                        },
                        {
                            elType: 'el-input',
                            zhName: '联系方式',
                            enName: 'telephone',
                            clearable: true
                        }
                    ]
                },
                searchFormOptions: [
                    [
                        {
                            elType: 'el-input',
                            zhName: '用户名',
                            enName: 'username',
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
                            zhName: '用户名',
                            enName: 'username'
                        },
                        {
                            elType: 'el-avatar',
                            zhName: '头像',
                            enName: 'avatar'
                        },
                        {
                            zhName: '电子邮箱',
                            enName: 'email'
                        },
                        {
                            zhName: '住址',
                            enName: 'address'
                        },
                        {
                            zhName: '联系方式',
                            enName: 'telephone'
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
                            zhName: '分配角色'
                        }
                    ]
                ],
                tableStyleOptions: {
                    selection: true
                },
                dialog: {
                    zhName: '',
                    slot: true,
                    show: false
                }
            };
        },
        created() {
            this.searchFunc();
            this.getAllRoleFunc();
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
                    } else if (zhName === '分配角色') {
                        this.crudForm = row;
                        this.dialog.slot = true;
                        this.getRoleOfUserFunc(row.id);
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
                } else if (zhName === '分配角色') {
                    this.addRoleFunc(this.crudForm.id);
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
                this.$axios.get('/boot/sys/sysUser/page', {params: params}).then(res => {
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
                this.$axios.post('/boot/sys/sysUser/save', this.crudForm).then(res => {
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
                this.$axios.put('/boot/sys/sysUser/update', this.crudForm).then(res => {
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
                this.$axios.delete('/boot/sys/sysUser/delete', {params: {ids: param}}).then(res => {
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
            getAllRoleFunc() {
                this.$axios.get('/boot/sys/sysRole/list', {}).then(res => {
                    if (res.data.success) {
                        this.roleData = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            getRoleOfUserFunc(id) {
                this.$axios.get('/boot/sys/sysUser/info/' + id).then(res => {
                    if (res.data.success) {
                        if (Array.isArray(res.data.result.roleIds)) {
                            this.selectedRoleDataIds = res.data.result.roleIds;
                            this.$refs['elTree'].setCheckedKeys(this.selectedRoleDataIds);
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            },
            addRoleFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let roleIds = this.$refs['elTree'].getCheckedKeys();
                this.$axios.post('/boot/sys/sysUser/role/' + this.crudForm.id, roleIds).then(res => {
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
        }
    };
</script>

<style lang='scss' scoped></style>
