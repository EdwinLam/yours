<template>
    <div>
        <Button type="ghost" @click="isShowAdd=true"><Icon type="person"></Icon>新增用户</Button>
        <addView v-model="isShowAdd" @afterAdd="afterAdd"/>
        <editView v-model="isShowEdit" :userItem="curUserItem" @afterEdit="afterEdit"/>
<Table :data="userItems" :columns="userColumns" stripe></Table>
<div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
        <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change="getUserItems"></Page>
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
        components:{
            addView,editView
        },
        mounted(){
          this.getUserItems(1)
        },
        computed: {
        },
        data () {
            return {
                total:0,
                pageNo:1,
                pageSize:10,
                userItems:[],
                curUserItem:{},
                isShowAdd:false,
                isShowEdit:false,
                userColumns: [
                    {
                        title: '名称',
                        key: 'nickname'
                    },
                    {
                        title: '号码',
                        key: 'phone'
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt',
                        render: (h, params) => {
                            return h('div', formatDate(this.userItems[params.index].createdAt));
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
            'queryPage','deleteById'
          ]),
          afterEdit(){
            this.getUserItems(this.pageNo)
          },
          afterAdd(){
            this.getUserItems(1)
          },
            getUserItems(pageNo){
              const bookKey ='user'
              this.queryPage({bookKey,pageNo}).then(res =>{
                this.userItems = res.data.values.rows
                this.total = res.data.values.count
              })
            },
            editInit(index){
               this.curUserItem=this.userItems[index]
               this.isShowEdit=true
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.userItems[index].nickname}<br>创建日期：${formatDate(this.userItems[index].createdAt)}`
                })
            },
            remove (index) {
              const ctx =this
              this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>是否删除用户'+this.userItems[index].nickname+'</p>',
                    onOk: async () => {
                      const bookKey ='user'
                      const id = this.userItems[index].id
                      this.deleteById({bookKey,id}).then((res)=>{
                        ctx.pageNo = ctx.total<=1 &&  ctx.pageNo>1?(ctx.pageNo-1):ctx.pageNo
                        iView.Message.success(res.data.message)
                        ctx.getUserItems(ctx.pageNo)
                        ctx.userItems.splice(index,1);
                      })
                    }
                })

            }
        }
    }
</script>