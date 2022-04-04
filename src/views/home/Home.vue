<template>
    <div class='home'>
        <div class='home-frame-lr-menu' :class='collapse.flag ? "menu-collapse" : "menu-not-collapse"'>
            <side-menu :collapse='collapse'></side-menu>
        </div>
        <div class='home-frame-lr-body' :class='collapse.flag ? "body-collapse" : "body-not-collapse"'>
            <infos :collapse='collapse'></infos>
            <tabs></tabs>
            <div class='routers'>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideMenu from '@/views/home/components/SideMenu';
    import Tabs from '@/views/home/components/Tabs';
    import Infos from '@/views/home/components/Infos';

    export default {
        name: 'Home',
        components: {Infos, Tabs, SideMenu},
        data() {
            return {
                collapse: {
                    flag: false
                }
            };
        }
    };
</script>

<style lang='scss' scoped>
    .home {
        width: 100%;
        height: 100%;

        .home-frame-lr-menu {
            float: left;
            height: 100%;

            &.menu-collapse {
                width: 64px;
            }

            &.menu-not-collapse {
                width: 200px;
            }
        }

        .home-frame-lr-body {
            float: left;
            height: 100%;

            &.body-collapse {
                width: calc(100% - 64px);
            }

            &.body-not-collapse {
                width: calc(100% - 200px);
            }

            .routers {
                width: 100%;
                height: calc(100% - 50px - 41px);
                box-sizing: border-box;
                padding: 0 5px;
            }
        }
    }
</style>


