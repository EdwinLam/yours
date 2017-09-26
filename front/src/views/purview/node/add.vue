<template>
    <div>
        <Modal v-model="isShowModal" title="新增" @on-cancel="cancel" ok-text="新增">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label=" 节点类型" prop="level">
                    <Select placeholder="请选择" v-model.number="formValidate.level" @on-change="onChange" number>
                        <Option :value="1">模块</Option>
                        <Option :value="2">功能</Option>
                        <Option :value="3">操作</Option>
                    </Select>
                </FormItem>
                <Form-item label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入名称" :disabled="loading"></Input>
                </Form-item>
                <FormItem label="标志">
                    <Input v-model="formValidate.flag" placeholder="请输入功能标志" :disabled="loading"></Input>
                </FormItem>
                <FormItem label="路径">
                    <Input v-model="formValidate.path" placeholder="请输入路径" :disabled="loading"></Input>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber v-model.number="formValidate.sort" :min="1"></InputNumber>
                </FormItem>
                <Form-item label="所属节点" prop="nodes">
                    <Cascader :data="baseData" v-model="formValidate.nodes" change-on-select ref="CascaderArea"></Cascader>
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
//      this.onChange = this.onChange.bind(this)

    },
    data () {
      const ctx = this
      const validateNode  =  (rule, value, callback) => {
        let isSuccess = false
        let errorMessage = ''
       if(ctx.formValidate.level ===1){
         isSuccess = value.length&&ctx.nodeHash[value[value.length-1]].level ===1
         errorMessage = !isSuccess ? '只能在[模块]节点下创建[模块]' : ''
       }else if(ctx.formValidate.level ===2){
           isSuccess = value.length&&ctx.nodeHash[value[value.length-1]].level ===1
           errorMessage = !isSuccess ? '只能在[模块]节点下创建[功能]' : ''
       }else if(ctx.formValidate.level ===3){
         isSuccess = value.length&&ctx.nodeHash[value[value.length-1]].level ===2
         errorMessage = !isSuccess ? '只能在[功能]节点下创建[操作]' : ''
       }
       return isSuccess?callback():callback(new Error(errorMessage))
      }
      return {

        baseData: [],
        loading: false,
        nodeHash:{},
        formValidate: {
          level: 1,
          name: '',
          flag: '',
          path: '',
          sort: 1,
          remark:'',
          nodes: []
        },
        // https://github.com/yiminghe/async-validator
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {type: 'string', max: 20, message: '名称不能超过20个字符', trigger: 'blur'}
          ],
          flag:[
            {type: 'string', max: 30, message: '功能标志不能超过30个字符', trigger: 'blur'}
          ],
          path:[
            {type: 'string', max: 100, message: '功能标志不能超过100个字符', trigger: 'blur'}
          ],
          remark:[
            {type: 'string', max: 100, message: '备注不能超过100个字符', trigger: 'blur'}
          ],
          nodes: [
            {validator: validateNode, trigger: 'change' },
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'add', 'custom'
      ]),
      onChange(value,selectedData){
      },
      setHashAll(data){
        const ctx = this
        data.forEach(function(el){
          let levelName = el.level === 1 ? '模块' : el.level === 2 ? '功能' : el.level === 3 ? '操作' : '???'
          el.label = el.label+'['+ levelName +']'
          ctx.nodeHash[el.code] = el
          if(el.children)
            ctx.setHashAll(el.children)
        })
      },
      async updateItems(){
        const ctx = this
        const res = await this.custom({bookKey: 'nodeApi', method: 'queryTree'})
        ctx.baseData = res.values
        if ( ctx.baseData.length)
          this.formValidate.nodes = [ ctx.baseData[0].value]
        ctx.setHashAll(ctx.baseData)
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
            this.formValidate.pCode = this.nodes.length ? this.nodes[this.nodes.length - 1] : 0
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