<template>
    <el-table ref='elTable' :data='tableData' border :header-cell-style='headerCellStyle'
              @selection-change="selectionChangeBtn" :row-key='tableStyleOptions.rowKey'
              :default-expand-all='tableStyleOptions.defaultExpandAll'>
        <el-table-column v-if='tableStyleOptions.selection' type="selection" width="55"></el-table-column>
        <el-table-column v-if='tableStyleOptions.indexFlag' label='序号' width='70' align='center'>
            <span slot-scope='scope'>{{scope.$index + 1}}</span>
        </el-table-column>
        <el-table-column v-for='(item, index) in columnOptions' :key='index' :width='item.width'
                         :show-overflow-tooltip='item.showOverflowTooltip' align='center' :label='item.label'>
            <template slot-scope="scope">
                <span :style='typeof item.style === "function" ? item.style(scope.row[item.prop]) : ""'>{{typeof item.text === 'function' ? item.text(scope.row[item.prop]) : scope.row[item.prop]}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200" v-if='operationOptions.length'>
            <template slot-scope="scope">
                <el-button v-for='(item, index) in operationOptions' :key='index'
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
            },
            operationOptions: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                headerCellStyle: {
                    background: '#fafafa',
                    color: 'rgba(0, 0, 0, .85)'
                },
            };
        },
        methods: {
            crudBtn(zhName, row) {
                this.$emit('crud', zhName, JSON.parse(JSON.stringify(row)));
            },
            selectionChangeBtn(val) {
                this.$emit('selection-change', val);
            },
            clearSelection() {
                this.$refs.elTable.clearSelection();
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
