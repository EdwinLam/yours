<template>
    <div>
    <Button type="ghost" @click="modal1 = true"><Icon type="person"></Icon>新增用户</Button>
    <Modal v-model="modal1" title="新建用户" loading @on-ok="ok" @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" ok-text="新建">
            <Form-item label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
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
    export default {
        components: {Icon},
        data () {
            return {
                modal1: false,
                formValidate: {
                    name: '',
                    password: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post("/api/user/create", {name:this.formValidate.name,password:this.formValidate.password}) .then((res) => {
                            if(res.data.success){
                                this.$emit('updateList')
                                this.$Message.info('新增成功')
                            }else{
                                this.$Message.info(res.data.message)
                            }
                            this.modal1=false;
                        }, (err) => {
                            this.modal1=false;
                            this.$Message.error('查询失败！')
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