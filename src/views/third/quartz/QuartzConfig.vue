<template>
    <crud-container :loading='loading'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :form-style-options='formStyleOptions'
                    :table-style-options='tableStyleOptions'
                    :table-data='tableData'
                    :crud-form='crudForm'
                    :crud-form-options='crudFormOptions'
                    :rule-options='ruleOptions'
                    :column-options='columnOptions'
                    :page='page'
                    :dialog='dialog'
                    @crud='crudBtn'
                    @dialog='dialogBtn'
                    @current-change='currentChangeBtn'
    ></crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';

    export default {
        name: 'QuartzConfig',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                dialog: {
                    show: false,
                    zhName: ''
                },
                searchForm: {},
                tableData: [],
                crudForm: {},
                crudFormOptions: {
                    '新增': [
                        {
                            elType: 'el-input',
                            zhName: '任务组',
                            enName: 'jobGroup',
                            clearable: true,
                            placeholder: '请输入任务组',
                        },
                        {
                            elType: 'el-input',
                            zhName: '任务名称',
                            enName: 'jobName',
                            clearable: true,
                            placeholder: '请输入任务名称',
                        },
                        {
                            elType: 'el-input',
                            zhName: '任务类名',
                            enName: 'jobClassName',
                            clearable: true,
                            placeholder: '请输入任务类名',
                        },
                        {
                            elType: 'el-input',
                            zhName: '触发器组',
                            enName: 'triggerGroup',
                            clearable: true,
                            placeholder: '请输入触发器组',
                        },
                        {
                            elType: 'el-input',
                            zhName: '触发器名称',
                            enName: 'triggerName',
                            clearable: true,
                            placeholder: '请输入触发器名称',
                        },
                        {
                            elType: 'el-input',
                            zhName: 'cron表达式',
                            enName: 'cronExpression',
                            clearable: true,
                            placeholder: '请输入cron表达式',
                        },
                    ]
                },
                ruleOptions: {
                    jobGroup: [
                        {required: true, message: '请输入任务组', trigger: 'blur'}
                    ],
                    jobName: [
                        {required: true, message: '请输入任务名称', trigger: 'blur'}
                    ],
                    jobClassName: [
                        {required: true, message: '请输入任务类名', trigger: 'blur'}
                    ],
                    triggerGroup: [
                        {required: true, message: '请输入触发器组', trigger: 'blur'}
                    ],
                    triggerName: [
                        {required: true, message: '请输入触发器名称', trigger: 'blur'}
                    ],
                    cronExpression: [
                        {required: true, message: '请输入cron表达式', trigger: 'blur'}
                    ],
                },
                columnOptions: [
                    [
                        {
                            zhName: '序号',
                            enName: 'index',
                            width: '70px'
                        },
                        {
                            zhName: '任务组',
                            enName: 'QrtzTriggers_jobGroup'
                        },
                        {
                            zhName: '任务名称',
                            enName: 'QrtzTriggers_jobName'
                        },
                        {
                            zhName: '任务类名',
                            enName: 'QrtzJobDetails_jobClassName',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '触发器组',
                            enName: 'QrtzTriggers_triggerGroup'
                        },
                        {
                            zhName: '触发器名称',
                            enName: 'QrtzTriggers_triggerName'
                        },
                        {
                            zhName: 'cron表达式',
                            enName: 'QrtzCronTriggers_cronExpression'
                        },
                        {
                            zhName: '状态',
                            enName: 'QrtzTriggers_triggerState',
                            style: (val) => {
                                let colorStyle = 'color: ';
                                if (val === 'WAITING') {
                                    colorStyle += '#e6a23c';
                                } else if (val === 'PAUSED') {
                                    colorStyle += '#e6a23c';
                                } else if (val === 'ACQUIRED') {
                                    colorStyle += '#409eff';
                                } else if (val === 'BLOCKED') {
                                    colorStyle += '#f56c6c';
                                } else if (val === 'ERROR') {
                                    colorStyle += '#f56c6c';
                                }
                                return colorStyle;
                            },
                            text: (val) => {
                                if (val === 'WAITING') {
                                    return '等待';
                                } else if (val === 'PAUSED') {
                                    return '暂停';
                                } else if (val === 'ACQUIRED') {
                                    return '正常执行';
                                } else if (val === 'BLOCKED') {
                                    return '阻塞';
                                } else if (val === 'ERROR') {
                                    return '错误';
                                }
                            }
                        }
                    ],
                    [
                        {
                            zhName: '暂停',
                            disabled: (zhName, row) => {
                                return row['QrtzTriggers_triggerState'] === 'PAUSED';
                            }
                        },
                        {
                            zhName: '恢复',
                            disabled: (zhName, row) => {
                                return row['QrtzTriggers_triggerState'] === 'ACQUIRED';
                            }
                        },
                        {
                            zhName: '重启'
                        },
                        {
                            zhName: '删除'
                        }
                    ]
                ],
                searchFormOptions: [
                    [
                        {
                            elType: 'el-input',
                            zhName: '任务组',
                            enName: 'jobGroup',
                            clearable: true,
                            placeholder: '请输入任务组',
                            style: () => {
                                return 'width: 180px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '任务名称',
                            enName: 'jobName',
                            clearable: true,
                            placeholder: '请输入任务名称',
                            style: () => {
                                return 'width: 180px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '任务类名',
                            enName: 'jobClassName',
                            clearable: true,
                            placeholder: '请输入任务类名',
                            style: () => {
                                return 'width: 180px';
                            }
                        }
                    ],
                    [
                        {
                            elType: 'el-input',
                            zhName: '触发器组',
                            enName: 'triggerGroup',
                            clearable: true,
                            placeholder: '请输入触发器组',
                            style: () => {
                                return 'width: 180px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '触发器名称',
                            enName: 'triggerName',
                            clearable: true,
                            placeholder: '请输入触发器名称',
                            style: () => {
                                return 'width: 180px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: 'cron表达式',
                            enName: 'cronExpression',
                            clearable: true,
                            placeholder: '请输入cron表达式',
                            style: () => {
                                return 'width: 180px';
                            }
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
                        }
                    ]
                ],
                formStyleOptions: {
                    horizontal: {
                        size: 'small',
                        labelWidth: '85px'
                    }
                },
                tableStyleOptions: {
                    selection: false
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
                } else if (zhName === '重置') {
                    this.searchForm = {};
                    this.page = {
                        pageSize: 10,
                        currentPage: 1,
                        total: 0
                    };
                    this.searchFunc();
                } else if (['暂停', '恢复', '重启', '删除'].includes(zhName)) {
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                    this.crudForm = row;
                } else if (zhName === '新增') {
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                    this.crudForm = {};
                }
            },
            dialogBtn(zhName) {
                if (['暂停', '恢复', '重启'].includes(zhName)) {
                    this.qrtzFunc(zhName);
                } else if (zhName === '删除') {
                    this.deleteFunc();
                } else if (zhName === '新增') {
                    this.addFunc();
                }
            },
            currentChangeBtn(currentPage) {
                this.page.currentPage = currentPage;
                this.searchFunc();
            },
            searchFunc() {
                !this.loading.show && (this.loading.show = true);
                let params = Object.assign({}, this.searchForm);
                params.currentPage = this.page.currentPage;
                params.pageSize = this.page.pageSize;
                this.$axios.get('/boot/quartzJob/page', {params: params}).then(res => {
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
            qrtzFunc(zhName) {
                let optionMap = {
                    '暂停': 'pause',
                    '恢复': 'resume',
                    '重启': 'reschedule'
                };
                this.dialog.show = false;
                this.loading.show = true;
                let params = {
                    jobGroup: this.crudForm['QrtzTriggers_jobGroup'],
                    jobName: this.crudForm['QrtzTriggers_jobName'],
                    triggerGroup: this.crudForm['QrtzTriggers_triggerGroup'],
                    triggerName: this.crudForm['QrtzTriggers_triggerName'],
                    cronExpression: this.crudForm['QrtzCronTriggers_cronExpression']
                };
                this.$axios.get('/boot/quartzJob/' + optionMap[zhName], {params: params}).then(res => {
                    if (res.data.success) {
                        if (zhName === '重启') {
                            setTimeout(() => {
                                this.$message.success(zhName + '成功!');
                                this.searchFunc();
                            }, 5000);
                        } else {
                            this.$message.success(zhName + '成功!');
                            this.searchFunc();
                        }
                    } else {
                        this.$message.error(res.data.message);
                        this.loading.show = false;
                    }
                }).catch(e => {
                    this.$message.error(e);
                    this.loading.show = false;
                });
            },
            deleteFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let params = {
                    jobGroup: this.crudForm['QrtzTriggers_jobGroup'],
                    jobName: this.crudForm['QrtzTriggers_jobName'],
                    triggerGroup: this.crudForm['QrtzTriggers_triggerGroup'],
                    triggerName: this.crudForm['QrtzTriggers_triggerName'],
                    cronExpression: this.crudForm['QrtzCronTriggers_cronExpression']
                };
                this.$axios.delete('/boot/quartzJob/delete', {params: params}).then(res => {
                    if (res.data.success) {
                        this.$message.success('删除成功!');
                        this.searchFunc();
                    } else {
                        this.$message.error(res.data.message);
                        this.loading.show = false;
                    }
                }).catch(e => {
                    this.$message.error(e);
                    this.loading.show = false;
                });
            },
            addFunc() {
                this.dialog.show = false;
                this.loading.show = true;
                let params = Object.assign({}, this.crudForm);
                this.$axios.post('/boot/quartzJob/save', params).then(res => {
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

<style lang='scss' scoped>

</style>
