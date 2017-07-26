<template>
    <div>
    <Button type="ghost" @click="isShowModal = true"><Icon type="person"></Icon>新增用户</Button>
    <Modal v-model="isShowModal" title="新建用户" :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" ok-text="新建">
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
            <Button type="primary" size="large":loading="loading" @click="ok">确认</Button>
        </div>
    </Modal>
    </div>
</template>
<script>
    import Icon from "../../../node_modules/iview/src/components/icon/icon";
    import { mapActions,mapState } from 'vuex'

    export default {
        components: {Icon},
        data () {
            const validatePhoneCheck = async (rule, value, callback) => {
                if(value==''){
                    callback()
                }else{
                    const isExistPhone = await this.$store.dispatch('isExistPhone',value)
                    if(isExistPhone){
                        callback(new Error('系统中已存在该手机号'))
                    }else{
                        callback();
                    }
                }
            }
            return {

                loading:false,
                isShowModal: false,
                formValidate: {
                    phone: '',
                    name: '',
                    password: ''
                },
                ruleValidate: {
                    phone: [
                        { required: true, message: '号码不能为空', trigger: 'blur' },
                        {validator: validatePhoneCheck, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]

                }
            }
        },
        methods: {
            ok () {
                this.handleSubmit("formValidate");
            },
            cancel () {
                this.isShowModal=false
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.loading=true
                        const success=await this.$store.dispatch('create', {name:this.formValidate.name, phone:this.formValidate.phone, password:this.formValidate.password})
                        if(success)
                            this.isShowModal=false
                        this.loading=false
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