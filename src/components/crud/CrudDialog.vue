<template>
    <el-dialog :title='dialog.zhName' :visible.sync='dialog.show' :close-on-click-modal='false'
               class='crud-dialog' :width='dialogStyle.width' :top='dialogStyle.top'>
        <template v-if='Array.isArray(formOptions) && formOptions.length'>
            <custom-form :form='form' :form-options='formOptions' :rule-options='ruleOptions'
                         :form-style-options='formStyleOptions' ref='customForm'
                         @select-change='selectChangeBtn'></custom-form>
        </template>
        <template v-else>
            <i class="el-icon-info crud-warning"></i>确定要<span style='font-weight: bold'>{{dialog.zhName}}</span>吗?
        </template>
        <div slot='footer'>
            <el-button @click='dialog.show = false'>取消</el-button>
            <el-button v-if='!["详情"].includes(dialog.zhName)' @click='dialogBtn(dialog.zhName)' type='primary'>确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';

    export default {
        name: 'CrudDialog',
        components: {CustomForm},
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
            ruleOptions: {
                type: Object,
                default() {
                    return {};
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
        data() {
            return {
                formStyleOptions: {
                    inline: false,
                    size: 'small',
                    labelWidth: '100px'
                },
                initForm: {}
            };
        },
        computed: {
            dialogStyle() {
                if (['新增', '编辑', '详情'].includes(this.dialog.zhName)) {
                    return {
                        width: '30%',
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
                if (Object.keys(this.ruleOptions) && this.$refs['customForm'] && this.$refs['customForm'].$refs['elForm']) {
                    this.$refs['customForm'].$refs['elForm'].validate((valid) => {
                        if (valid) {
                            this.$emit('dialog', zhName);
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$emit('dialog', zhName);
                }
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

        /deep/ .el-dialog__footer {
            padding: 0 20px 10px 20px;
        }
    }

</style>
