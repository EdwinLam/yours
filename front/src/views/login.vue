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
                    <a href="https://api.weibo.com/oauth2/authorize?client_id=2719342288&redirect_uri=http://127.0.0.1:8080/login&response_type=code" target="_blank">微博单点测试</a>
"
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
        mounted:function(){
            var weiboCode=this.$route.query.code;
            if(weiboCode!=null){//微博单点登录
                this.$http.get('/api/weibo/getAccessToken',  {
                    params: {code:weiboCode}
                }).then((res) => {
                    console.log(res);
                    sessionStorage.setItem('weibo-token',res.data.access_token)
                    sessionStorage.setItem('weibo-uid',res.data.uid)
                }, (err) => {
                    this.$Message.error('微博单点失败！')
                    sessionStorage.setItem('weibo-token',null) // 将token清空
                    sessionStorage.setItem('weibo-uid',null)
                })
            }
        },
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
                _this.$refs[name].validate(async (valid) => {
                    if (valid) {
                       const isSuccess=await this.$store.dispatch('login', {
                            name: this.formInline.user,
                            password: this.formInline.password
                        })
                        if(isSuccess){
                            this.$Message.success('用户身份验证成功！');
                            this.$router.push('/index') // 进入todolist页面，登录成功
                        }else{
                            this.$Message.error(""); // 登录失败，显示提示语
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    };
</script>