<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .index h1 {
        height: 150px;
    }

    .index h1 img {
        height: 100%;
    }


    .index .ivu-row-flex {
        height: 100%;
    }

</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="6">
                <h1>
                    <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png">
                </h1>

                <div>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <Form-item prop="user">
                            <Input type="text" v-model="formInline.user" icon="ios-person-outline" placeholder="Username"/>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" v-model="formInline.password" icon="ios-locked-outline" placeholder="Password"/>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
                        </Form-item>
                    </Form>
                </div>
        </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 1, message: '密码长度不能小于1位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                let _this=this;
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.$http.post('/auth/login', {name:_this.formInline.user,password:_this.formInline.password}) // 将信息发送给后端
                            .then((res) => {
                                console.log(res);
                                if(res.data.success){ // 如果成功
                                    sessionStorage.setItem('yours-token',res.data.token); // 用sessionStorage把token存下来
                                    this.$Message.success('登录成功！');
                                    this.$router.push('/main') // 进入todolist页面，登录成功
                                }else{
                                    this.$Message.error(res.data.message); // 登录失败，显示提示语
                                    sessionStorage.setItem('yours-token',null); // 将token清空
                                }
                            }, (err) => {
                                this.$Message.error('请求错误！')
                                sessionStorage.setItem('yours-token',null); // 将token清空
                            })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    };
</script>