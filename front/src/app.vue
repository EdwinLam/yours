<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState,mapActions } from 'vuex'
    import * as types from './store/mutation-types'

    export default {
        data() {
            return {

            };
        },
        computed: {
            ...mapState({
                showMsg: ({assistant}) => assistant.showMsg,
                toggle:({assistant}) => assistant.toggle,
                type:({assistant}) => assistant.type,
                path:({assistant}) => assistant.path,
                pathToggle:({assistant}) => assistant.pathToggle,
            })
        },

        watch: {
            toggle:function () {
                this.$Message[this.type](this.showMsg);
            },
            pathToggle:function(){
                this.$router.push(this.path)
            }
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