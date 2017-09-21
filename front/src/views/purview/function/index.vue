<style scoped>
    .op-btn-menu {
        padding-bottom: 10px;
    }
</style>
<template>
    <div>
        <div class="op-btn-menu">
            <Button type="ghost" @click="isShowAdd=true">
                <Icon type="plus"></Icon>
                新增
            </Button>
        </div>
        <addView v-model="isShowAdd" @afterAdd="afterAdd" ref="addModal" />
        <!--<editView v-model="isShowEdit" :userItem="curRoleItem" @afterEdit="afterEdit"/>-->
        <Table :data="roleItems" :columns="userColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change="getItems"></Page>
            </div>
        </div>
    </div>
</template>
<script>
  import addView from './add.vue'
  import editView from './edit.vue'
  import { mapActions } from 'vuex'
  import { formatDate } from '@/utils/base'
  import iView from 'iview';

  export default {
    components: {
      addView, editView
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
        roleItems: [],
        curRoleItem: {},
        isShowAdd: false,
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
              return h('div', formatDate(this.roleItems[params.index].createdAt));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
        this.queryPage({bookKey:'nodeApi', pageNo}).then(res => {
          this.roleItems = res.values.rows
          this.total = res.values.count
        })
      },
      editInit(index){
        this.curRoleItem = this.roleItems[index]
        this.isShowEdit = true
      },
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.roleItems[index].name}<br>创建日期：${formatDate(this.roleItems[index].createdAt)}`
        })
      },
      remove (index) {
        const ctx = this
        this.$Modal.confirm({
          title: '确认对话框标题',
          content: '<p>是否删除用户' + this.roleItems[index].name + '</p>',
          onOk: async () => {
            const bookKey = 'nodeApi'
            const id = this.roleItems[index].id
            this.deleteById({bookKey, id}).then((res) => {
              ctx.pageNo = ctx.total <= 1 && ctx.pageNo > 1 ? (ctx.pageNo - 1) : ctx.pageNo
              iView.Message.success(res.message)
              ctx.getItems(ctx.pageNo)
              ctx.roleItems.splice(index, 1)
              const child = ctx.$refs.addModal //获取子组件实例
              child.updateRole()
            })
          }
        })
      }
    }
  }
</script>