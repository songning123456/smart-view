<template>
    <div class='crud-dialog-form' :style='"height: " + formStyle.height'>
        <el-form :model='form' :label-width='formStyle.labelWidth'>
            <el-row v-for='i in Math.ceil(formOptions.length / 2)' :key='i'>
                <el-col :span='12' v-for='j in 2' :key='j'>
                    <template v-if='formOptions[2 * i + j - 3]'>
                        <el-form-item :label='formOptions[2 * i + j - 3].zhName'
                                      :required="formOptions[2 * i + j - 3].required">
                            <el-input v-if='formOptions[2 * i + j - 3].type === "input"'
                                      v-model='form[formOptions[2 * i + j - 3].enName]'
                                      :placeholder='formOptions[2 * i + j - 3].placeholder'
                                      :clearable='formOptions[2 * i + j - 3].clearable' :rows='formOptions[2 * i + j - 3].rows'
                                      :type='formOptions[2 * i + j - 3].textarea ? "textarea" : ""'
                                      :disabled='formOptions[2 * i + j - 3].disabled'></el-input>
                            <el-select v-if='formOptions[2 * i + j - 3].type=== "select"'
                                       v-model='form[formOptions[2 * i + j - 3].enName]'
                                       @change='selectChangeBtn(formOptions[2 * i + j - 3].enName, form[formOptions[2 * i + j - 3].enName])'
                                       :placeholder='formOptions[2 * i + j - 3].placeholder'
                                       :clearable='formOptions[2 * i + j - 3].clearable' :disabled='formOptions[2 * i + j - 3].disabled'>
                                <el-option v-for='(it, iIndex) in formOptions[2 * i + j - 3].options'
                                           :key='iIndex' :label='it.label' :value='it.value'></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-col>
            </el-row>
        </el-form>
    </div>
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
