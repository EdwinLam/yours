<template>
    <div>
        <Modal v-model="isShowModal" title="新建角色" @on-cancel="cancel" ok-text="新建">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入名称" :disabled="loading"></Input>
                </Form-item>
                <Form-item label="所属角色">
                    <Cascader :data="baseData" v-model="selectedRoles" change-on-select @on-change="onchange"
                              not-found-text="暂无角色信息" ref="CascaderArea"></Cascader>
                </Form-item>
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

      this.updateRole()
    },
    data () {
      return {
        selectedRoles: [],
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
      onchange(value, selectedData){

      },
      async updateRole(){
        const ctx = this
        const res = await this.custom({bookKey: 'roleApi', method: 'queryTree'})
        this.baseData = res.values
        if (res.values.length)
          this.selectedRoles = [res.values[0].value]
        setTimeout(function () {
          ctx.$refs.CascaderArea.updateSelected(true)
        }, 100)
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
          if (valid && this.selectedRoles.length) {
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
              ctx.updateRole()
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