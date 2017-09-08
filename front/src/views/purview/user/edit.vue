<template>
    <div>
        <Modal v-model="isShowModal" title="编辑用户" @on-cancel="cancel" ok-text="保存修改">
            <Form ref="formValidate" :model="userInfo" :rules="ruleValidate" :label-width="80" >

                <Form-item label="名称" prop="name">
                    <Input v-model="userInfo.nickname" placeholder="请输入名称" :disabled="loading"></Input>
                </Form-item>

            </Form>
            <div slot="footer">
                <Button type="ghost"  size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large":loading="loading" @click="ok">保存修改</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import Icon from "../../../../node_modules/iview/src/components/icon/icon";
    import { mapActions,mapState } from 'vuex'

    export default {
        components: {Icon},
        props: ['value','userItem'],
        computed: {
            isShowModal: function () {
                return this.value
            },
            userInfo:function(){
                return {nickname:this.userItem.nickname,phone:this.userItem.phone,id:this.userItem.id}
            }
        },
        data () {
            return {
                loading:false,
                ruleValidate: {

                    nickname: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '名称不能超过20个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ok () {
                this.handleSubmit("formValidate")
            },
            cancel () {
                this.$emit('input', false)
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.loading=true
                        const success=await this.$store.dispatch('updateUser',this.userInfo)
                        if(success)
                            this.$emit('input', false)
                        this.loading=false
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>