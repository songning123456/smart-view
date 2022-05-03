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
            transition: ease-in-out;
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
            transition: ease-in-out;

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


