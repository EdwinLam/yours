<template>
    <div>
    <Button type="ghost" @click="modal1 = true"><Icon type="person"></Icon>新增用户</Button>
    <Modal v-model="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </Modal>
    </div>
</template>
<script>
    import Icon from "../../../node_modules/iview/src/components/icon/icon";
    export default {
        components: {Icon},
        data () {
            return {
                modal1: false
            }
        },
        methods: {
            ok () {
                this.$http.post("/api/user/create", {name:"haha",password:"haha"}) .then((res) => {
                   console.log(res);
                }, (err) => {
                    this.$Message.error('查询失败！')
                })
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        }
    }
</script>