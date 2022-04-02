import Vue from 'vue';

Vue.mixin({
    methods: {
        hasAuth(permission) {
            let authority = this.$store.state.menus.permissionList;
            return authority.indexOf(permission) > -1;
        }
    }
});
