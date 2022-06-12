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
                    @dialog='dialogBtn'>
        <template v-slot>
            <div style='height: 350px; overflow-y: auto'>
                <element-video v-if='searchForm.uploadPath === "video"'
                               :source='{src: fileServerPrefix + crudForm.suffixUrl, type: "video/mp4"}'></element-video>
                <element-audio v-if='searchForm.uploadPath === "music"'
                               :source='{src: fileServerPrefix + crudForm.suffixUrl, type: "audio/mpeg"}'></element-audio>
                <element-image v-else-if='searchForm.uploadPath === "image"'
                               :source='fileServerPrefix + crudForm.suffixUrl'></element-image>
            </div>
        </template>
    </crud-container>
</template>

<script>
    import CrudContainer from '@/components/crud/CrudContainer';
    import label from '@/utils/label';
    import {dictItem} from '@/utils/sysDict';
    import ElementVideo from '@/views/element/components/ElementVideo';
    import ElementAudio from '@/views/element/components/ElementAudio';
    import ElementImage from '@/views/element/components/ElementImage';

    export default {
        name: 'FileList',
        components: {ElementImage, ElementAudio, ElementVideo, CrudContainer},
        data() {
            return {
                loading: {
                    show: false
                },
                fileServerPrefix: '',
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
                        },
                        {
                            zhName: '预览',
                            disabled(zhName, row) {
                                return zhName === '预览' && row.fileType !== 'file';
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
                    style: {},
                    zhName: '',
                    slot: false,
                    show: false
                }
            };
        },
        created() {
            dictItem('FileUploadPath').then(result => {
                this.searchFormOptions[0][0].options = result.map(option => {
                    return {
                        label: option.itemText,
                        value: option.itemValue
                    };
                });
                dictItem('FileServer').then(result => {
                    this.fileServerPrefix = result[0].itemValue;
                });
                this.searchForm.uploadPath = this.searchFormOptions[0][0].options[0].value;
                this.searchFunc();
            });
        },
        methods: {
            crudBtn(zhName, row) {
                this.dialog.slot = false;
                this.dialog.style = {};
                if (zhName === '查询') {
                    this.searchFunc();
                } else if (zhName === '删除') {
                    this.crudForm = row;
                    (this.dialog.show = true) && (this.dialog.zhName = zhName);
                } else if (zhName === '下载') {
                    label.downloadByA(window.location.origin + row.suffixUrl);
                } else if (zhName === '预览') {
                    this.dialog.slot = true;
                    this.dialog.show = true;
                    this.dialog.zhName = row.fileName;
                    this.dialog.style.width = '1000px';
                    this.crudForm = row;
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
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
