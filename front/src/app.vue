<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState,mapActions } from 'vuex'
    export default {
        data() {
            return {

            };
        },
        computed: {

        },

        watch: {

        },
        created() {
            this.restoreData()
        },
        beforeDestroy() {

        },
        methods: {
            ...mapActions([
                'restoreData'
            ])
        }
    };
</script>