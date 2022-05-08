<template>
    <el-dialog class='crud-dialog'
               :title='dialog.zhName'
               :visible.sync='dialog.show'
               :close-on-click-modal='false'
               :width='dialogStyle.width'
               :top='dialogStyle.top'>
        <template v-if='dialog.slot'>
            <slot></slot>
        </template>
        <template v-else-if='Array.isArray(formOptions) && formOptions.length'>
            <custom-form :form='form'
                         :form-options='formOptions'
                         :rule-options='ruleOptions'
                         :form-style-options='formStyleOptions'
                         ref='customForm'></custom-form>
        </template>
        <template v-else>
            <i class='el-icon-info crud-warning'></i>确定要<strong>{{dialog.zhName}}</strong>吗?
        </template>
        <div slot='footer'>
            <el-button @click='dialog.show = false'>取消</el-button>
            <el-button
                    v-if='Array.isArray(formOptions) && (!formOptions.length || (formOptions.filter(item => item.disabled === true).length < formOptions.length))'
                    @click='dialogBtn(dialog.zhName)' type='primary'>确定
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
                        slot: null,
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
            },
            formStyleOptions: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        watch: {
            'dialog.show'(newVal, oldVal) {
                if (!newVal && oldVal) {
                    if (this.dialog.slot) {
                        setTimeout(() => {
                            this.dialog.slot = false;
                        }, 200);
                    }
                    if (this.$refs['customForm'] && this.$refs['customForm'].$refs['elForm']) {
                        this.$refs['customForm'].$refs['elForm'].resetFields();
                    }
                }
            }
        },
        computed: {
            dialogStyle() {
                let baseStyle = {
                    width: '30%',
                    top: '15vh'
                };
                if (this.dialog.style && typeof this.dialog.style === 'object') {
                    Object.keys(this.dialog.style).forEach(key => {
                        baseStyle[key] = this.dialog.style[key];
                    });
                }
                if (this.dialog.slot) {
                    // ...
                } else if (Array.isArray(this.formOptions) && !this.formOptions.length) {
                    baseStyle.top = '35vh';
                } else {
                    // ...
                }
                return baseStyle;
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
