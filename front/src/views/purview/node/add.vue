<template>
    <div>
        <Modal v-model="isShowModal" title="新增" @on-cancel="cancel" ok-text="新增">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="节点类型">
                    <Select placeholder="请选择" v-model="selectLevel" @on-change="onChange">
                        <Option value="1">模块</Option>
                        <Option value="2">功能</Option>
                        <Option value="3">操作</Option>
                    </Select>
                </FormItem>
                <Form-item label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入名称" :disabled="loading"></Input>
                </Form-item>
                <FormItem label="功能标志">
                    <Input v-model="formValidate.flag" placeholder="请输入功能标志" :disabled="loading"></Input>
                </FormItem>
                <FormItem label="路径">
                    <Input v-model="formValidate.path" placeholder="请输入路径" :disabled="loading"></Input>
                </FormItem>

                <FormItem label="排序">
                    <InputNumber v-model="formValidate.sort" :min="1"></InputNumber>
                </FormItem>

                <Form-item label="所属节点">
                    <Cascader :data="baseData" v-model="selectedRoles" change-on-select ref="CascaderArea"></Cascader>
                </Form-item>
                <FormItem label="备注">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="loading" @click="ok">新增</Button>
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
      this.updateItems()
    },
    data () {
      return {
        selectLevel: "1",
        selectedRoles: [],
        baseData: [],
        loading: false,
        formValidate: {
          name: '',
          flag: '',
          path: '',
          sort: 1,
          remark:''
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
      onChange(){
        this.updateItems()
      },
      async updateItems(){
        const ctx = this
        const level = this.selectLevel === "1" || this.selectLevel === "2" ? 1 : 2
        const res = await this.custom({bookKey: 'nodeApi', method: 'queryTree',data:{level: level}})
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
          if (valid) {
            this.loading = true
            this.formValidate.pCode = this.selectedRoles.length ? this.selectedRoles[this.selectedRoles.length - 1] : 0
            ctx.add({bookKey: 'nodeApi', data: this.formValidate}).then(res => {
              this.$emit('input', false)
              this.$emit('afterAdd')
              this.loading = false
              this.handleReset("formValidate")
              iView.Message.success(res.message)
              ctx.updateItems()
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