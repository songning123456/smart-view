<template>
    <crud-container
            :loading='loading'
            :form-style-options='formStyleOptions'
            :search-form='searchForm'
            :search-form-options='searchFormOptions'
            :table-data='tableData'
            :table-style-options='tableStyleOptions'
            :crud-form='crudForm'
            :crud-form-options='crudFormOptions'
            :column-options='columnOptions'
            :dialog='dialog'
            :page='page'
            @crud='crudBtn'
            @dialog='dialogBtn'
            @current-change='currentChangeBtn'></crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';
    import {dictItem} from '@/utils/sysDict';

    export default {
        name: 'Log',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                formStyleOptions: {
                    horizontal: {
                        labelWidth: '85px'
                    }
                },
                page: {
                    pageSize: 20,
                    currentPage: 1,
                    total: 0
                },
                searchForm: {},
                tableData: [],
                tableStyleOptions: {
                    defaultExpandAll: false,
                    selection: false
                },
                crudForm: {},
                crudFormOptions: {
                    '详情': [
                        {
                            elType: 'el-input',
                            zhName: '线程名称',
                            enName: 'threadName',
                            disabled: true,
                            style: () => {
                                return 'width: 400px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '类路径名称',
                            enName: 'logName',
                            disabled: true,
                            style: () => {
                                return 'width: 400px';
                            }
                        },
                        {
                            elType: 'el-input',
                            type: 'textarea',
                            zhName: '日志内容',
                            enName: 'message',
                            disabled: true,
                            style: () => {
                                return 'width: 400px';
                            },
                            rows: 10
                        }
                    ]
                },
                searchFormOptions: [
                    [
                        {
                            elType: 'el-select',
                            zhName: '日志类型',
                            enName: 'logType',
                            placeholder: '请输入日志类型',
                            clearable: true,
                            options: [],
                            style: () => {
                                return 'width: 150px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: 'IP地址',
                            enName: 'logIp',
                            placeholder: '请输入IP地址',
                            clearable: true,
                            style: () => {
                                return 'width: 150px';
                            }
                        },
                        {
                            elType: 'el-input-number',
                            zhName: '端口号',
                            enName: 'logPort',
                            placeholder: '请输入端口号',
                        },
                        {
                            elType: 'el-select',
                            zhName: '日志级别',
                            enName: 'logLevel',
                            placeholder: '请输入日志级别',
                            clearable: true,
                            options: [],
                            style: () => {
                                return 'width: 150px';
                            }
                        },
                    ],
                    [
                        {
                            elType: 'el-input',
                            zhName: '线程名称',
                            enName: 'threadName',
                            placeholder: '请输入线程名称',
                            clearable: true,
                            style: () => {
                                return 'width: 150px';
                            }
                        },
                        {
                            elType: 'el-input',
                            zhName: '类路径名称',
                            enName: 'logName',
                            placeholder: '请输入类路径名称',
                            clearable: true,
                            style: () => {
                                return 'width: 150px';
                            }
                        },
                        {
                            elType: 'el-date-picker',
                            zhName: '时间',
                            enName: 'timeRange',
                            type: 'datetimerange',
                            clearable: true,
                            style: () => {
                                return 'width: 375px';
                            }
                        }
                    ],
                    [
                        {
                            elType: 'el-input',
                            zhName: '日志内容',
                            enName: 'message',
                            placeholder: '请输入日志内容',
                            clearable: true,
                            style: () => {
                                return 'width: 300px';
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
                            zhName: '清空',
                            type: 'danger',
                            plain: true
                        }]
                ],
                columnOptions: [
                    [
                        {
                            zhName: '序号',
                            enName: 'index',
                            width: '70px'
                        },
                        {
                            zhName: '日志类型',
                            enName: 'logType',
                            text: (val) => {
                                let res = val;
                                for (let i = 0; i < this.searchFormOptions[0][0].options.length; i++) {
                                    if (this.searchFormOptions[0][0].options[i].value === '' + val) {
                                        res = this.searchFormOptions[0][0].options[i].label;
                                        break;
                                    }
                                }
                                return res;
                            },
                            style: () => {
                                return 'font-weight: bold';
                            }
                        },
                        {
                            zhName: 'IP地址',
                            enName: 'logIp',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '端口号',
                            enName: 'logPort',
                        },
                        {
                            zhName: '日志级别',
                            enName: 'logLevel',
                            text: (val) => {
                                let res = val;
                                for (let i = 0; i < this.searchFormOptions[0][3].options.length; i++) {
                                    if (this.searchFormOptions[0][3].options[i].value === '' + val) {
                                        res = this.searchFormOptions[0][3].options[i].label;
                                        break;
                                    }
                                }
                                return res;
                            },
                            style: (val) => {
                                let colorStyle = 'color: ';
                                if (val === 'WARNING') {
                                    colorStyle += '#e6a23c';
                                } else if (val === 'ERROR') {
                                    colorStyle += '#f56c6c';
                                } else {
                                    colorStyle += '#409eff';
                                }
                                return colorStyle;
                            }
                        },
                        {
                            zhName: '线程名称',
                            enName: 'threadName',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '类路径名称',
                            enName: 'logName',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '时间',
                            enName: 'timeStamp',
                            showOverflowTooltip: true
                        },
                        {
                            zhName: '日志内容',
                            enName: 'message',
                            showOverflowTooltip: true
                        },
                    ],
                    [
                        {
                            zhName: '详情'
                        },
                        {
                            zhName: '删除'
                        },
                    ]
                ],
                dialog: {
                    zhName: '',
                    show: false,
                    style: {
                        width: '50%',
                    }
                },
            };
        },
        created() {
            dictItem('LogType').then(result => {
                this.searchFormOptions[0][0].options = result.map(option => {
                    return {
                        label: option.itemText,
                        value: option.itemValue
                    };
                });
            });
            dictItem('LogLevel').then(result => {
                this.searchFormOptions[0][3].options = result.map(option => {
                    return {
                        label: option.itemText,
                        value: option.itemValue
                    };
                });
            });
        },
        methods: {
            crudBtn(zhName, row) {
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '重置') {
                    this.searchForm = {};
                    this.page = {
                        pageSize: 20,
                        currentPage: 1,
                        total: 0
                    };
                    this.searchFunc();
                } else if (zhName === '详情') {
                    this.dialog.style.width = '50%';
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                    this.crudForm = row;
                } else if (zhName === '删除') {
                    this.dialog.style.width = '30%';
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                    this.crudForm = row;
                } else if (zhName === '清空') {
                    this.dialog.style.width = '30%';
                    this.dialog.show = true;
                    this.dialog.zhName = zhName;
                    this.crudForm = {};
                }
            },
            dialogBtn(zhName) {
                if (zhName === '删除') {
                    this.deleteFunc(this.crudForm.id);
                } else if (zhName === '清空') {
                    this.deleteFunc('');
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
                if (this.searchForm.timeRange && this.searchForm.timeRange[0]) {
                    params.startTime = this.searchForm.timeRange[0] + '.000';
                }
                if (this.searchForm.timeRange && this.searchForm.timeRange[1]) {
                    params.endTime = this.searchForm.timeRange[1] + '.999';
                }
                delete params.timeRange;
                this.$axios.get('/boot/sys/sysLog/page', {params: params}).then(res => {
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
            deleteFunc(param) {
                this.dialog.show = false;
                this.loading.show = true;
                this.$axios.delete('/boot/sys/sysLog/delete', {params: {ids: param}}).then(res => {
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
