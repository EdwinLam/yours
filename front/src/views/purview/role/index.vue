<style scoped>
    .op-btn-menu {
        padding-bottom: 10px;
    }
</style>
<template>
    <div>
        <div class="op-btn-menu">
            <Button type="ghost" @click="isShowAdd=true">
                <Icon type="person"></Icon>
                新增角色
            </Button>
        </div>
        <addView v-model="isShowAdd" @afterAdd="afterAdd" ref="addModal" />
        <assignmentView v-model="isShowAssignment" ref="assignmentModal" />

        <!--<editView v-model="isShowEdit" :userItem="curRoleItem" @afterEdit="afterEdit"/>-->
        <Table :data="items" :columns="userColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change="getItems"></Page>
            </div>
        </div>
    </div>
</template>
<script>
  import addView from './add.vue'
  import assignmentView from './assignment.vue'
  import editView from './edit.vue'
  import { mapActions } from 'vuex'
  import { formatDate } from '@/utils/base'
  import iView from 'iview';

  export default {
    components: {
      addView, editView, assignmentView
    },
    mounted(){
      this.getItems(1)
    },
    computed: {},
    data () {
      return {
        total: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        curRoleItem: {},
        isShowAdd: false,
        isShowAssignment: false,
        isShowEdit: false,
        userColumns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '创建时间',
            key: 'createdAt',
            render: (h, params) => {
              return h('div', formatDate(this.items[params.index].createdAt));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editInit(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.assignmentInit(params.index)
                    }
                  }
                }, '权限分配'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'queryPage', 'deleteById'
      ]),
      afterEdit(){
        this.getItems(this.pageNo)
      },
      afterAdd(){
        this.getItems(1)
      },
      getItems(pageNo){
        this.queryPage({bookKey:'roleApi', pageNo}).then(res => {
          this.items = res.values.rows
          this.total = res.values.count
        })
      },
      assignmentInit:function(index){
        console.log(this.$refs.assignmentModal)
        this.$refs.assignmentModal.initNode(this.items[index].pcode)
        this.isShowAssignment = true
      },
      editInit(index){
        this.curRoleItem = this.items[index]
        this.isShowEdit = true
      },
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.items[index].name}<br>创建日期：${formatDate(this.items[index].createdAt)}`
        })
      },
      remove (index) {
        const ctx = this
        this.$Modal.confirm({
          title: '确认对话框标题',
          content: '<p>是否删除用户' + this.items[index].name + '</p>',
          onOk: async () => {
            const bookKey = 'roleApi'
            const id = this.items[index].id
            this.deleteById({bookKey, id}).then((res) => {
              ctx.pageNo = ctx.total <= 1 && ctx.pageNo > 1 ? (ctx.pageNo - 1) : ctx.pageNo
              iView.Message.success(res.message)
              ctx.getItems(ctx.pageNo)
              ctx.items.splice(index, 1)
              const child = ctx.$refs.addModal //获取子组件实例
              child.updateRole()
            })
          }
        })
      }
    }
  }
</script>