<template>
    <div class='upload'>
        <el-upload :action='upload.action ? upload.action : ""'
                   :drag='!!upload.drag'
                   :show-file-list='!!upload.showUploadList'
                   :disabled='disabled'
                   :http-request='httpRequest'>
            <i class='el-icon-upload'></i>
            <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-progress v-show='progress.show' type="circle" :percentage='progress.percentage'></el-progress>
    </div>
</template>

<script>
    import {uploadByPieces} from '@/utils/upload';

    export default {
        name: 'Upload',
        props: {
            upload: {
                type: Object,
                default() {
                    return {
                        action: '',
                        drag: true,
                        showUploadList: false
                    };
                }
            }
        },
        data() {
            return {
                disabled: false,
                progress: {
                    percentage: 0,
                    show: false
                },
            };
        },
        methods: {
            httpRequest(file) {
                this.disabled = true;
                uploadByPieces({
                    file: file.file,
                    fileType: 'file',
                    pieceSize: 10,
                    progress: data => {
                        this.progress.percentage = data;
                    },
                    success: data => {
                        if (data.isExist) {
                            this.$message.warning('文件已经上传');
                            this.disabled = false;
                        }
                        // 合并分片成功后重新查询一次数据
                        if (data.shardMerge) {
                            // this.queryData();
                        }
                        // 显示 上传进度条
                        if (data.showProgress) {
                            this.progress.show = true;
                        }
                        // 隐藏 上传进度条
                        if (data.hideProgress) {
                            setTimeout(() => {
                                this.progress.show = false;
                                this.progress.percentage = 0;
                            }, 1000);
                        }
                    },
                    error: e => {
                        this.$message.error('分片上传视频失败 ' + e);
                        this.disabled = false;
                    }
                });
            }
        }
    };
</script>

<style lang='scss' scoped>

    .upload {
        .el-progress {
            width: 160px;
            position: absolute;
            top: 50%;
            left: 88%;
            transform: translate(-50%, -50%);
        }
    }

</style>
