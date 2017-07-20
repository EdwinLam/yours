<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import * as types from './store/mutation-types'

    export default {
        data() {
            return {

            };
        },
        created() {
            this.$store.dispatch('restoreData')
        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>