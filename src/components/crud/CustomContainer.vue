<template>
    <div class='custom-container'>
        <div class='custom-container-frame-ud-form' v-for='(searchFormOption, index) in searchFormOptions' :key='index'>
            <custom-form :form='searchForm' :form-options='searchFormOption' @crud='crudBtn'></custom-form>
        </div>
        <div class='custom-container-frame-ud-body' :style="'height: calc((100% - ' + searchFormOptions.length * 60 + 'px))'">
            <slot name='customBody'></slot>
        </div>
    </div>
</template>

<script>
    import CustomForm from '@/components/crud/CustomForm';

    export default {
        name: 'CustomContainer',
        components: {CustomForm},
        props: {
            loading: {
                type: Object,
                default() {
                    return {show: false};
                }
            },
            searchForm: {
                type: Object,
                default() {
                    return {};
                }
            },
            searchFormOptions: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {};
        },
        methods: {
            crudBtn(zhName) {
                this.$emit('crud', zhName);
            },
        }
    };
</script>

<style lang='scss' scoped>
    .custom-container {
        width: 100%;
        height: 100%;

        .custom-container-frame-ud-form {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
        }

        .custom-container-frame-ud-body {
            width: 100%;
        }

    }

</style>
