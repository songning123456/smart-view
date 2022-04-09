<template>
    <div class='file-upload'>
        <upload v-model='fileUrl'></upload>
    </div>
</template>

<script>
    import Upload from '@/components/upload/Upload';

    export default {
        name: 'FileUpload',
        components: {Upload},
        data() {
            return {
                fileUrl: ''
            };
        }
    };
</script>

<style lang='scss' scoped>
    .file-upload {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
