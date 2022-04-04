<template>
    <div class='home'>
        <div class='home-frame-lr-menu' :class="{'menu-active':isCollapse, 'menu-not-active': !isCollapse}">
            <side-menu></side-menu>
        </div>
        <div class='home-frame-lr-body' :class="{'body-active':isCollapse, 'body-not-active': !isCollapse}">
            <infos></infos>
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
                isCollapse: true
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

            &.menu-active {
                width: 200px;
            }

            &.menu-not-active {
                width: 200px;
            }
        }

        .home-frame-lr-body {
            float: left;
            height: 100%;

            &.body-active {
                width: calc(100% - 200px);
            }

            &.body-not-active {
                width: 200px;
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


