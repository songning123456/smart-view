<template>
    <div class='element-video'>
        <video-player
                ref='videoPlayer'
                :playsinline='true'
                :options='playerOptions'
                :x5-video-player-fullscreen='true'
                @ready='playerIsReady'
        ></video-player>
    </div>
</template>

<script>

    import 'videojs-flash';
    import 'videojs-hotkeys';

    export default {
        name: 'ElementVideo',
        data() {
            return {
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [],
                    //你的封面地址
                    poster: require('@/assets/aiqiyi.svg'),
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: true,
                        // 全屏按钮
                        fullscreenToggle: true
                    }
                }
            };
        },
        props: {
            source: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        watch: {
            source: {
                handler(newVal, oldVal) {
                    this.playerOptions.sources[0] = newVal;
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            playerIsReady(player) {
                player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false,
                    // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                    fullscreenKey: function (event, player) {
                        // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                        return ((event.which === 70) || (event.ctrlKey && event.which === 13));
                    }
                });
            },
        }
    };
</script>

<style lang='scss' scoped>

    .element-video {
        height: 100%;
        width: 100%;
    }

</style>
