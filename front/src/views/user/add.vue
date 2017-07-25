<template>
    <div>
    <Button type="ghost" @click="modal1 = true"><Icon type="person"></Icon>新增用户</Button>
    <Modal v-model="modal1" title="新建用户" :loading="loading" @on-ok="ok" @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" ok-text="新建">
            <Form-item label="手机" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入手机"></Input>
            </Form-item>
            <Form-item label="名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
            </Form-item>
        </Form>

    </Modal>
    </div>
</template>
<script>
    import Icon from "../../../node_modules/iview/src/components/icon/icon";
    import { mapActions,mapState } from 'vuex'

    export default {
        components: {Icon},
        data () {
            return {
                loading:true,
                modal1: false,
                formValidate: {
                    phone: '',
                    name: '',
                    password: ''
                },
                ruleValidate: {
                    phone: [
                        { required: true, message: '号码不能为空', trigger: 'blur' }
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
                this.modal1=false
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        const success=await this.$store.dispatch('create', {name:this.formValidate.name, phone:this.formValidate.phone, password:this.formValidate.password})
                        if(success)
                            this.modal1=false
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