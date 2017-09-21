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
                    <Form-item prop="phone">
                        <Input type="text" v-model="formInline.phone" icon="iphone" placeholder="请输入手机号"/>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="formInline.password" icon="ios-locked-outline" placeholder="请输入密码"/>
                    </Form-item>
                    <a href="https://api.weibo.com/oauth2/authorize?client_id=2719342288&redirect_uri=http://127.0.0.1:8080/weiboLogin&response_type=code">
                        <img src="../../images/weibo_login.png"/>
                    </a>
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
  import iView from 'iview'
  import router from '../../router'
  import { mapMutations,mapActions } from 'vuex'
  import * as types from '@/store/mutation-types'
  export default {
    mounted:function(){

    },
    data () {
      return {
        formInline: {
          phone: '',
          password: ''
        },
        ruleInline: {
          phone: [
            { required: true, message: '请填写手机', trigger: 'blur' }
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
        'checkIdentity'
      ]),
      ...mapMutations([
        types.VISITOR_GET_PERMIT,types.VISITOR_FORGET_ME
      ]),
      handleSubmit(name) {
        const ctx = this
        ctx.$refs[name].validate(async (valid) => {
          if (valid) {
            ctx.checkIdentity(this.formInline).then((res) => {
              if(res.success){
                ctx[types.VISITOR_GET_PERMIT]({user:res.values.userInfo,token:res.values.token,auth:res.values.auth})
                iView.Message.success(res.message)
                router.push('/purview/user')
              }else{
                iView.Message.error(res.message)
                ctx[types.VISITOR_FORGET_ME]()
                router.push('/login')
              }
            }).catch(() => {
//                        this.loading = false
            })

          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  };
</script>