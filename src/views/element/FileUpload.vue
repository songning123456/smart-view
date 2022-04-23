<template>
    <div class='file-upload'>
        <div class='file-upload-frame-ud-form'>
            <custom-form :form='searchForm' :form-options='searchFormOptions'
                         :form-style-options='searchFormStyleOptions'></custom-form>
        </div>
        <div class='file-upload-frame-ud-upload'>
            <upload v-model='fileUrl' :file-params='{uploadPath: searchForm.uploadPath, pieceSize: 5}'></upload>
        </div>
    </div>
</template>

<script>
    import Upload from '@/components/upload/Upload';
    import CustomForm from '@/components/crud/CustomForm';

    export default {
        name: 'FileUpload',
        components: {CustomForm, Upload},
        data() {
            return {
                fileUrl: '',
                searchForm: {
                    uploadPath: ''
                },
                searchFormOptions: [

                    {
                        elType: 'el-select',
                        zhName: '文件上传路径',
                        enName: 'uploadPath',
                        clearable: true,
                        options: []
                    },

                ],
                searchFormStyleOptions: {
                    inline: true,
                    size: 'small'
                }
            };
        },
        created() {
            this.getDictItemFunc('FileUploadPath');
        },
        methods: {
            getDictItemFunc(dictCode) {
                this.$axios.get('/boot/sys/sysDictItem/dictItem/' + dictCode).then(res => {
                    if (res.data.success) {
                        let options = res.data.result;
                        this.searchFormOptions[0].options = options.map(option => {
                            return {
                                label: option.itemText,
                                value: option.itemValue
                            };
                        });
                        this.searchForm.uploadPath = this.searchFormOptions[0].options[0].value;
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

<style lang='scss' scoped>
    .file-upload {
        position: relative;
        width: 100%;
        height: 100%;

        .file-upload-frame-ud-form {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
        }

        .file-upload-frame-ud-upload {
            width: 100%;
            height: calc(100% - 50px);

            display: flex;
            justify-content: center;
            align-items: center;
        }

    }

</style>
