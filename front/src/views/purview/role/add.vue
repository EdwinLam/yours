<template>
    <div>
    <Modal v-model="isShowModal" title="新建用户" @on-cancel="cancel" ok-text="新建">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <Form-item label="手机" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入手机" :disabled="loading"></Input>
            </Form-item>
            <Form-item label="名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入名称" :disabled="loading"></Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码" :disabled="loading"></Input>
            </Form-item>
        </Form>
        <div slot="footer">
            <Button type="ghost"  size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large":loading="loading" @click="ok">新建用户</Button>
        </div>
    </Modal>
    </div>
</template>
<script>
    import Icon from "../../../../node_modules/iview/src/components/icon/icon";
    import { mapActions } from 'vuex'
    import iView from 'iview';

    export default {
        components: {Icon},
        props: ['value'],
        computed: {
            isShowModal: function () {
                return this.value
            }
        },
        data () {
            const ctx = this
            const validatePhoneCheck = async (rule, value, callback) => {
              const data = {phone:value}
              const bookKey = 'user'
              const method = 'isExistPhone'
              const res =await ctx.custom({bookKey,method,data})
              res.success?callback(new Error('系统中已存在该手机号')):callback()
            }
            return {
                loading:false,
                formValidate: {
                    phone: '',
                    name: '',
                    password: ''
                },
                ruleValidate: {
                    phone: [
                        { required: true, message: '号码不能为空', trigger: 'blur' },
                        { pattern: '^1[3|4|5|7|8][0-9]{9}$', message: '手机号码格式不符', trigger: 'blur' },
                        {validator: validatePhoneCheck, trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '名称不能超过20个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ]

                }
            }
        },
        methods: {
          ...mapActions([
            'add','custom'
          ]),
            ok () {
                this.handleSubmit("formValidate")
            },
            cancel () {
                this.$emit('input', false)
                this.handleReset("formValidate")
            },
            handleSubmit (name) {
                const ctx = this
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.loading=true
                        const data = {nickname:this.formValidate.name, phone:this.formValidate.phone, password:this.formValidate.password}
                        const bookKey = 'user'
                        ctx.add({bookKey,data}).then( res =>{
                            this.$emit('input', false)
                            this.$emit('afterAdd')
                            this.loading=false
                            this.handleReset("formValidate")
                            iView.Message.success(res.message)
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>