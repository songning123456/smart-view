<template>
    <el-dialog :title='dialog.zhName' :visible.sync='dialog.show' :close-on-click-modal='false'
               class='crud-dialog' :width='dialogStyle.width' :top='dialogStyle.top'>
        <template v-if='["新增", "编辑", "查看"].includes(dialog.zhName)'>
            <crud-dialog-form :form-style='{labelWidth: "120px", height: "600px"}' :form='form'
                              :form-options='formOptions' @select-change='selectChangeBtn'></crud-dialog-form>
        </template>
        <template v-else-if='["删除", "批量删除"].includes(dialog.zhName)'>
            <i class="el-icon-info crud-warning"></i>确定将选择数据删除?
        </template>
        <template v-else>
            <i class="el-icon-info crud-warning"></i>确定要<span style='font-weight: bold'>{{dialog.zhName}}</span>?
        </template>
        <div slot='footer'>
            <el-button @click='dialog.show = false'>取消</el-button>
            <el-button v-if='!["查看"].includes(dialog.zhName)' @click='dialogBtn(dialog.zhName)' type='primary'>
                确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import CrudDialogForm from '@/components/crud/CrudDialogForm';

    export default {
        name: 'CrudDialog',
        components: {CrudDialogForm},
        props: {
            dialog: {
                type: Object,
                default() {
                    return {
                        zhName: '未知',
                        show: false
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
        computed: {
            dialogStyle() {
                if (['新增', '编辑', '查看'].includes(this.dialog.zhName)) {
                    return {
                        width: '60%',
                        top: '15vh'
                    };
                } else if (['删除', '批量删除'].includes(this.dialog.zhName)) {
                    return {
                        width: '30%',
                        top: '35vh'
                    };
                } else {
                    return {
                        width: '30%',
                        top: '35vh'
                    };
                }
            }
        },
        methods: {
            dialogBtn(zhName) {
                this.$emit('dialog', zhName);
            },
            selectChangeBtn(key, val) {
                this.$emit('select-change', key, val);
            }
        }

    };
</script>

<style lang='scss' scoped>
    .crud-dialog {

        /deep/ .el-dialog__body {
            padding: 16px 20px;

            .crud-warning {
                margin-right: 10px;
                color: #e6a23c;
            }
        }
    }

</style>
