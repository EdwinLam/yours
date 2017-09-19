<template>
    <div>
        <Modal v-model="isShowModal" title="新建角色" @on-cancel="cancel" ok-text="新建">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入名称" :disabled="loading"></Input>
                </Form-item>
                <Form-item label="所属角色">
                    <Tree :data="baseData" @on-select-change="selectChange"></Tree>
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
    mounted () {
      this.updateRole()
    },
    data () {
      return {
        selectedRole: {},
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
      async updateRole(){
        const bookKey = 'role'
        const method = 'queryTree'
        const res = await this.custom({bookKey, method})
        this.baseData = res.values
        if (res.values.length)
          this.selectedRole = res.values[0]
      },
      setSelect:function(items,code){
        const ctx = this
        items.forEach(function(el){
          if(el.code === code)
            el.selected=true
          if(el.children)
            ctx.setSelect(el.children,code)
        })
      },
      selectChange(array){
        if( array.length){
          this.selectedRole = array[0]
        }else{
          this.setSelect(this.baseData,this.selectedRole.code)
        }
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
          if (valid && this.selectedRole.code) {
            this.loading = true
            const name = this.formValidate.name
            const pCode = this.selectedRole.code
            const pName = this.selectedRole.name
            const data = {name, pCode, pName}
            const bookKey = 'role'
            ctx.add({bookKey, data}).then(res => {
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