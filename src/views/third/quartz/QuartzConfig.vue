<template>
    <crud-container :loading='loading'
                    :search-form='searchForm'
                    :search-form-options='searchFormOptions'
                    :table-style-options='tableStyleOptions'
                    :table-data='tableData'
                    :crud-form='crudForm'
                    :column-options='columnOptions'
                    :page='page'
                    @crud='crudBtn'
                    @dialog='dialogBtn'
                    @current-change='currentChangeBtn'
                    @selection-change='selectionChangeBtn'
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
                searchForm: {},
                tableData: [],
                crudForm: {},
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
                            enName: 'QrtzJobDetails_jobClassName'
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
                    ],
                    [
                        {
                            zhName: '暂停'
                        },
                        {
                            zhName: '恢复'
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
                            elType: 'el-button',
                            noLabel: true,
                            zhName: '查询',
                            type: 'primary'
                        },
                    ]
                ],
                tableStyleOptions: {
                    selection: false
                }
            };
        },
        methods: {
            crudBtn(zhName, row) {
                if (zhName === '查询') {
                    this.searchFunc();
                }
            },
            dialogBtn(zhName) {

            },
            currentChangeBtn(currentPage) {

            },
            selectionChangeBtn(val) {

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
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
