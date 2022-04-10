<template>
    <div class='upload'>
        <el-upload :action='elUpload.action ? elUpload.action : ""'
                   :drag='!!elUpload.drag'
                   :show-file-list='!!elUpload.showUploadList'
                   :disabled='disabled'
                   :http-request='httpRequest'>
            <i class='el-icon-upload'></i>
            <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
            <div class='el-upload__tip' slot='tip'>
                <el-progress v-show='progress.show' :type='elProgress.type'
                             :percentage='progress.percentage'></el-progress>
            </div>
        </el-upload>
    </div>
</template>

<script>
    import {uploadByPieces} from '@/utils/upload';

    export default {
        name: 'Upload',
        props: {
            value: String,
            elUpload: {
                type: Object,
                default() {
                    return {
                        action: '',
                        drag: true,
                        showUploadList: false
                    };
                }
            },
            elProgress: {
                type: Object,
                default() {
                    return {
                        type: 'line'
                    };
                }
            },
            fileParams: {
                type: Object,
                default() {
                    return {
                        uploadPath: 'default',
                        pieceSize: 5
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
                }

            };
        },
        methods: {
            httpRequest(file) {
                this.disabled = true;
                uploadByPieces({
                    file: file.file,
                    uploadPath: this.fileParams.uploadPath ? this.fileParams.uploadPath : 'default',
                    pieceSize: this.fileParams.pieceSize ? this.fileParams.pieceSize : 5,
                    progress: data => {
                        if (data === 'show') {
                            this.progress.show = true;
                        } else {
                            this.progress.percentage = data;
                        }
                    },
                    success: data => {
                        if (data.isExist) {
                            this.$message.success('文件已经上传');
                        }
                        // 合并分片成功
                        if (data.shardMerge) {
                            this.$message.success('文件上传成功');
                            setTimeout(() => {
                                this.progress.percentage = 0;
                                this.progress.show = false;
                            }, 1000);
                        }
                        this.disabled = false;
                        this.$emit('input', window.location.origin + data.suffixUrl);
                    },
                    error: e => {
                        this.$message.error('分片上传视频失败 ' + e);
                        this.disabled = false;
                        setTimeout(() => {
                            this.progress.percentage = 0;
                            this.progress.show = false;
                        }, 1000);
                    }
                });
            }
        }
    };
</script>

<style lang='scss' scoped>

    .upload {
        width: 360px;
        float: left;

        /deep/ .el-upload__tip {
            margin-top: unset;
        }
    }

</style>
