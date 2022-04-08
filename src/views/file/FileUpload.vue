<template>
    <div class='file-upload'>
        <upload></upload>
    </div>
</template>

<script>
    import Upload from '@/components/upload/Upload';

    export default {
        name: 'FileUpload',
        components: {Upload},
        data() {
            return {
                upload: {

                }
            };
        }
    };
</script>

<style lang='scss' scoped>
    .file-upload {
        position: relative;
        width: 100%;
        height: 100%;
    }

</style>
