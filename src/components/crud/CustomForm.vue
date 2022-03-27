<template>
    <el-form :inline='true' :model='form' size='small'>
        <el-form-item v-for='(item, index) in formOptions' :key='index'
                      :label='item.elType !== "el-button" ? item.zhName : ""'>
            <el-input v-if='item.elType === "el-input"' v-model='form[item.enName]' :placeholder='item.placeholder'
                      :clearable='item.clearable'></el-input>
            <el-select v-if='item.elType === "el-select"' v-model='form[item.enName]' :placeholder='item.placeholder'
                       :clearable='item.clearable'>
                <el-option v-for='(it, i) in item.options' :key='i' :label='it.label' :value='it.value'></el-option>
            </el-select>
            <el-date-picker v-if='item.elType === "el-date-picker"' v-model="form[item.enName]" :type='item.dateType'
                            :picker-options="item.pickerOptions" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" align="right" :clearable='item.clearable'></el-date-picker>
            <el-button v-if='item.elType === "el-button"' :type='item.btnType' :icon='item.icon'
                       @click='crudBtn(item.zhName)'>{{item.zhName}}
            </el-button>
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
            }
        },
        methods: {
            crudBtn(zhName) {
                this.$emit('crud', zhName);
            }
        }
    };
</script>

<style lang='scss' scoped>

    .el-form {
        /deep/ .el-form-item {
            margin-bottom: unset;
        }
    }

</style>
