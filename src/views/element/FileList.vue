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
    import common from '@/utils/common';

    export default {
        name: 'FileList',
        components: {CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                searchForm: {
                    uploadPath: ''
                },
                crudForm: {},
                tableData: [],
                searchFormOptions: [
                    [
                        {
                            elType: 'el-select',
                            zhName: '文件上传路径',
                            enName: 'uploadPath',
                            clearable: true,
                            options: []
                        },
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
                        {
                            zhName: '文件类型',
                            enName: 'fileType',
                            style(val) {
                                let color = '#409eff';
                                if (val === 'file') {
                                    color = '#67c23a';
                                }
                                return 'color: ' + color;
                            }
                        },
                    ],
                    [
                        {
                            zhName: '删除'
                        },
                        {
                            zhName: '下载',
                            disabled(zhName, row) {
                                return zhName === '下载' && row.fileType !== 'file';
                            }
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
            this.getDictItemFunc('FileUploadPath');
        },
        methods: {
            crudBtn(zhName, row) {
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '删除') {
                    this.crudForm = row;
                    (this.dialog.show = true) && (this.dialog.zhName = zhName);
                } else if (zhName === '下载') {
                    common.downloadByA(window.location.origin + row.suffixUrl);
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
                this.$axios.delete('/boot/file/fileList/delete/' + this.crudForm.encryptionId).then(res => {
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
            getDictItemFunc(dictCode) {
                this.$axios.get('/boot/sys/sysDictItem/dictItem/' + dictCode).then(res => {
                    if (res.data.success) {
                        let options = res.data.result;
                        this.searchFormOptions[0][0].options = options.map(option => {
                            return {
                                label: option.itemText,
                                value: option.itemValue
                            };
                        });
                        this.searchForm.uploadPath = this.searchFormOptions[0][0].options[0].value;
                        this.searchFunc();
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                });
            }
        }
    };
</script>

<style scoped>

</style>
