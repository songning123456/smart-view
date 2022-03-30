<template>
    <el-form :inline='formStyleOptions.inline' :model='form' :size='formStyleOptions.size'
             :label-width='formStyleOptions.labelWidth' :rules='ruleOptions' ref='elForm'>
        <el-form-item v-for='(item, index) in formOptions' :key='index' :prop='item.enName'
                      :label='item.elType !== "el-button" ? item.zhName : ""' :class='{"custom-form-item": !formStyleOptions.inline}'>
            <el-input v-if='item.elType === "el-input"' v-model='form[item.enName]' :placeholder='item.placeholder'
                      :clearable='item.clearable' :disabled='item.disabled'></el-input>
            <el-select v-if='item.elType === "el-select"' v-model='form[item.enName]' :placeholder='item.placeholder'
                       :clearable='item.clearable' :disabled='item.disabled'
                       @change='selectChangeBtn(form[item.enName], form[item.enName])'>
                <el-option v-for='(it, i) in item.options' :key='i' :label='it.label' :value='it.value'>
                    <span v-if='it.alias'>{{it.alias}}</span>
                </el-option>
            </el-select>
            <el-date-picker v-if='item.elType === "el-date-picker"' v-model="form[item.enName]" :type='item.dateType'
                            :picker-options="item.pickerOptions" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" align="right" :clearable='item.clearable'
                            :disabled='item.disabled'></el-date-picker>
            <el-button v-if='item.elType === "el-button"' :type='item.btnType' :icon='item.icon'
                       @click='crudBtn(item.zhName)'>{{item.zhName}}
            </el-button>
            <el-radio-group v-if='item.elType === "el-radio-group"' :disabled='item.disabled'
                            v-model='form[item.enName]'>
                <el-radio v-for='(it, i) in item.options' :key='i' :label='it.value'>{{it.label}}</el-radio>
            </el-radio-group>
            <el-input-number v-if='item.elType === "el-input-number"' v-model='form[item.enName]' :label='item.zhName'
                             :disabled='item.disabled'
                             :min='typeof item.min === "number" ? item.min : -Infinity'
                             :max='typeof item.max === "number" ? item.max : Infinity'></el-input-number>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'CustomForm',
        props: {
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
                    return {
                        inline: true,
                        size: 'small',
                        labelWidth: '80px'
                    };
                }
            },
            ruleOptions: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        methods: {
            crudBtn(zhName) {
                this.$emit('crud', zhName);
            },
            selectChangeBtn(key, val) {
                this.$emit('select-change', key, val);
            }
        }
    };
</script>

<style lang='scss' scoped>

    .el-form {
        /deep/ .el-form-item {
            margin-bottom: unset;
        }

        .custom-form-item {
            margin-bottom: 10px;
        }
    }

</style>
