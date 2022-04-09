<template>
    <el-table ref='elTable' :data='tableData' border
              :header-cell-style="{background: '#fafafa',color: 'rgba(0, 0, 0, .85)'}"
              @selection-change="selectionChangeBtn" :row-key='tableStyleOptions.rowKey'
              :default-expand-all='tableStyleOptions.defaultExpandAll'>
        <el-table-column v-if='tableStyleOptions.selection' type="selection" width="55"></el-table-column>
        <el-table-column v-for='(item, index) in columnOptions[0]' :key='index' :width='item.width'
                         :show-overflow-tooltip='item.showOverflowTooltip' :align='item.align ? item.align : "center"'
                         :label='item.zhName'>
            <template slot-scope='scope'>
                <template v-if='item.elType === "el-avatar"'>
                    <el-avatar size='small' :src='scope.row[item.enName]'></el-avatar>
                </template>
                <template v-else>
                    <span :style='typeof item.style === "function" ? item.style(scope.row[item.enName]) : ""'>{{typeof item.text === 'function' ? item.text(scope.row[item.enName]) : (item.enName === 'index' ? (scope.$index + 1) : scope.row[item.enName])}}</span>
                </template>
            </template>
        </el-table-column>
        <el-table-column v-if='Array.isArray(columnOptions[1])' label="操作" width="200" align='center'>
            <template slot-scope='scope'>
                <el-button v-for='(item, index) in columnOptions[1]' :key='index' :disabled='typeof item.disabled === "function" ? item.disabled(item.zhName, scope.row) : false'
                           @click="crudBtn(item.zhName, scope.row)" type="text" size="small">{{item.zhName}}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: 'CustomTable',
        props: {
            tableData: {
                type: Array,
                default() {
                    return [];
                }
            },
            tableStyleOptions: {
                type: Object,
                default() {
                    return {};
                }
            },
            columnOptions: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            crudBtn(zhName, row) {
                this.$emit('crud', zhName, JSON.parse(JSON.stringify(row)));
            },
            selectionChangeBtn(val) {
                this.$emit('selection-change', val);
            }
        }
    };
</script>

<style lang='scss' scoped>

    .el-table {
        width: 100%;
        height: 100%;

        /deep/ .el-table__body-wrapper {
            height: calc(100% - 49px);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: rgba(0, 0, 0, 0.2);
            }

            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }

</style>
