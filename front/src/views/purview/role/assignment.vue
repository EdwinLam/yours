<template>
    <div>
        <Modal v-model="isShowModal" title="权限分配" @on-cancel="cancel" ok-text="新建">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Tree :data="baseData" show-checkbox></Tree>
            </Form>
            <div slot="footer">
                <Button type="ghost" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="loading" @click="ok">新建角色</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import Icon from "iview/src/components/icon/icon";
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
    mounted () {
    },
    data () {
      return {
        baseData: [],
        loading: false,
        formValidate: {
          name: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {type: 'string', max: 20, message: '名称不能超过20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'add', 'custom'
      ]),
      onchange(value){

      },
      async initNode(code){
        const res = await this.custom({bookKey: 'nodeApi', method: 'getCanSelectNodes',data:{code}})
        this.baseData = res.values.rows
      },
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
            this.loading = true
            const name = this.formValidate.name
            const pCode = this.selectedRoles[this.selectedRoles.length - 1]
            const pName = ''
            ctx.add({bookKey: 'roleApi', data: {name, pCode, pName}}).then(res => {
              this.$emit('input', false)
              this.$emit('afterAdd')
              this.loading = false
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