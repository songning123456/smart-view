<template>
    <div class='element-audio'>
        <audio controls>
            <source :src='source.src' :type='source.type'>
        </audio>
    </div>
</template>

<script>
    export default {
        name: 'ElementAudio',
        props: {
            source: {
                type: Object,
                default() {
                    return {};
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

    .element-audio {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
