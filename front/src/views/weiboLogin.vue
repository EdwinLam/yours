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

                        <Tabs value="name1" size="small">
                            <Tab-pane label="绑定已有" name="name1">
                                <Form-item prop="user">
                                    <Input type="text" v-model="formInline.user" icon="ios-person-outline" placeholder="Username"/>
                                </Form-item>
                                <Form-item prop="password">
                                    <Input type="password" v-model="formInline.password" icon="ios-locked-outline" placeholder="Password"/>
                                </Form-item>

                                <Form-item>
                                    <Button type="primary" @click="handleSubmit('formInline')" long>绑定</Button>
                                </Form-item>
                            </Tab-pane>
                            <Tab-pane label="新建绑定" name="name2">
                                <Form-item prop="user">
                                    <Input type="text" v-model="formInline.user" icon="ios-person-outline" placeholder="phone"/>
                                </Form-item>
                                <Form-item prop="user">
                                    <Input type="text" v-model="formInline.user" icon="ios-person-outline" placeholder="Username"/>
                                </Form-item>
                                <Form-item prop="password">
                                    <Input type="password" v-model="formInline.password" icon="ios-locked-outline" placeholder="Password"/>
                                </Form-item>
                                <Form-item prop="password">
                                    <Input type="password" v-model="formInline.password" icon="ios-locked-outline" placeholder="Password"/>
                                </Form-item>

                                <Form-item>
                                    <Button type="primary" @click="handleSubmit('formInline')" long>新建</Button>
                                </Form-item>

                            </Tab-pane>
                        </Tabs>

                    </Form>
                </div>
        </Col>
        </Row>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import state from '../store/index'


    export default {
        beforeCreate: function () {
            let weiboCode=this.$route.query.code;
            if (weiboCode != null) {//微博单点登录
                state.dispatch('weiboLogin',{code: weiboCode})
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
            ...mapActions([
               'login',
                'weiboLogin'
            ]),
            handleSubmit(name) {
                let _this=this;
                _this.$refs[name].validate(async (valid) => {
                    if (valid) {
                       this.login({
                            name: this.formInline.user,
                            password: this.formInline.password
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    };
</script>