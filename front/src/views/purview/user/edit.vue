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
    import { mapActions } from 'vuex'

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
              ...mapActions([
                'update'
            ]),
            ok () {
                this.handleSubmit("formValidate")
            },
            cancel () {
                this.$emit('input', false)
            },
            handleSubmit (name) {
                const ctx = this
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.loading=true
                      const data = this.userInfo
                      const bookKey = 'user'
                      const res=await ctx.update({bookKey,data})
                      if(res.success){
                        this.$emit('afterEdit', false)
                        this.$emit('input', false)
                        this.$Message.success(res.message)
                      }else{
                        this.$Message.error(res.message)
                      }

                      this.loading=false
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>