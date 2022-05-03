<template>
    <div class='charts' ref='charts'></div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: 'Charts',
        comments: {echarts},
        data() {
            return {
                chart: null
            };
        },
        props: {
            option: Object,
        },
        mounted() {
            this.$nextTick(() => {
                if (!this.chart) {
                    this.init();
                }
            });
        },
        watch: {
            option: {
                // eslint-disable-next-line no-unused-vars
                handler(newVal, oldVal) {
                    this.chart.setOption(newVal);
                }
            },
            deep: true
        },
        methods: {
            init() {
                this.chart = echarts.init(this.$refs['charts'], 'light');
                this.chart.setOption(this.option);
            }
        }
    };
</script>

<style lang='scss' scoped>

    .charts {
        width: 100%;
        height: 100%;
    }

</style>
