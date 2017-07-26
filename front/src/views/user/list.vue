<template>
    <div>
        <addView @updateList="queryPage(1)"></addView>
<Table :data="userItems" :columns="userColumns" stripe></Table>
<div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
        <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change="getUserItems"></Page>
    </div>
</div>
    </div>
</template>
<script>
    import addView from './add.vue';
    import { mapActions,mapState } from 'vuex'

    export default {
        components:{
            addView
        },
        mounted(){
            this.getUserItems(1,10)
        },
        computed: {
            ...mapState({
                userItems: ({user}) => user.userItems,
                total: ({user}) => user.total,
                pageNo: ({user}) => user.pageNo,
                pageSize: ({user}) => user.pageSize
            })
        },
        data () {
            return {

                userColumns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt',
                        render: (h, params) => {
                            return h('div', this.$Util.formatDate(this.userItems[params.index].createdAt));
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.userItems[index].name}<br>创建日期：${this.$Util.formatDate(this.userItems[index].createdAt)}`
                })
            },
            remove (index) {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>是否删除用户'+this.userItems[index].name+'</p>',
                    onOk: async () => {
                        await this.$store.dispatch('deleteUser', this.userItems[index].id)
                    }
                });

            },
            ...mapActions([
                'getUserItems'
            ])
        }
    }
</script>