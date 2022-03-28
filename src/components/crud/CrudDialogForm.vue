<template>
    <div class='crud-dialog-form'></div>
</template>

<script>
    export default {
        name: 'CrudDialogForm',
        props: {
            formStyle: {
                type: Object,
                default() {
                    return {
                        labelWidth: '110px',
                        height: ''
                    };
                }
            },
            form: {
                type: Object,
                default() {
                    return {};
                }
            },
            formOptions: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            selectChangeBtn(key, val) {
                this.$emit('select-change', key, val);
            }
        }
    };
</script>

<style lang='scss' scoped>

    .crud-dialog-form {
        width: 100%;
        height: 100%;

        .el-form {

            /deep/ .el-form-item {
                margin-bottom: 20px;
            }

            /deep/ .el-select {
                width: 360px;
            }

            /deep/ .el-input {
                width: 360px;
            }

            /deep/ .el-textarea {
                width: 360px;
            }
        }
    }

</style>
