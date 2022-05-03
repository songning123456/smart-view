<template>
    <div class='index' :style="{'background-image': `url(${require('@/assets/background/index.jpg')})`}">
        <charts :option='echartsOption'></charts>
    </div>
</template>

<script>
    import Charts from '@/components/echarts/Charts';

    export default {
        name: 'Index',
        components: {Charts},
        computed: {
            echartsOption() {
                let data = [];
                this.backtrack([{metaTitle: '菜单', children: this.$store.state.menus.menuList}], data);
                return {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            id: 0,
                            name: 'tree1',
                            data: data,
                            top: '10%',
                            left: '8%',
                            bottom: '22%',
                            right: '20%',
                            symbolSize: 7,
                            edgeShape: 'polyline',
                            edgeForkPosition: '63%',
                            initialTreeDepth: 3,
                            lineStyle: {
                                width: 2
                            },
                            label: {
                                backgroundColor: 'rgba(255,255,255,0)',
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right'
                            },
                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },
                            emphasis: {
                                focus: 'descendant'
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                };
            }
        },
        methods: {
            backtrack(srcArr, targetArr) {
                for (let i = 0; i < srcArr.length; i++) {
                    if (targetArr[i] === undefined) {
                        targetArr[i] = {};
                    }
                    targetArr[i].name = srcArr[i].metaTitle;
                    targetArr[i].children = [];
                    this.backtrack(srcArr[i].children, targetArr[i].children);
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    .index {
        width: 100%;
        height: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

</style>
