<style scoped>

    .layout {
        border: 1px solid #d7dde4;
        background: #ebebeb;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 600px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 20px 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: white;
        border-right: 2px solid transparent;
        /*min-width: 100px;*/
    }

    .layout-header {
        height: 30px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 100%;
        height: 30px;
        background:#2b85e4;
        margin-left: auto;
        margin-right: auto;
        line-height: 30px;
        color: white;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }
    .layout-hide-text .ivu-menu-submenu-title-icon{
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }

</style>

<template>

    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="cIndex" @on-select="selectModule" theme="light" width="auto" style="height:100%">
                    <div class="layout-logo-left">
                        <h3>RIPPLE</h3>
                    </div>
                    <Menu-item  v-for="(item, index) in passport" :key="item.path" :name="index" >
                        <Icon type="person-stalker" :size="iconSize"></Icon>
                        <span class="layout-text">{{item.name}}</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click.native="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div>
                    <Menu mode="horizontal"  :active-name="0" @on-select="selectFunction">
                        <MenuItem v-for="(item, index) in functionItems" :key="item.path" :name="index"  >
                            {{item.name}}
                        </MenuItem>
                    </Menu>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item>{{moduleName}}</Breadcrumb-item>
                        <Breadcrumb-item>{{functionName}}</Breadcrumb-item>
                        <!--<Breadcrumb-item>{{detailName}}</Breadcrumb-item>-->
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <transition mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; NSLab
                </div>
            </i-col>
        </Row>
    </div>

</template>

<script>
  import { mapState } from 'vuex'

    export default {

        data() {
            return {
                moduleName:'',
                functionName:'',
                cIndex:0,
                functionItems:[],
                spanLeft: 5,
                spanRight: 19,
                page: ['about','form','table','markdown-viewer', 'markdown-editor-1', 'markdown-editor-2','rtf','upload','echarts']
            }
        },
      created() {
        const ctx = this
        this.passport.forEach(function(el,index){
          if(ctx.$route.path.indexOf(el.path) !== -1) {
            ctx.moduleName = el.name
            ctx.cIndex = index
            ctx.functionItems = el.children
          }
        })
        ctx.functionItems.forEach(function(el){
          if(ctx.$route.path==el.path){
            ctx.functionName = el.name
          }
        })
      },
        computed: {
            ...mapState({
              passport: ({visitor}) => visitor.passport,
            }),
            iconSize() {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            selectFunction:function(index){
              const ctx = this
              this.$router.push(ctx.functionItems[index].path)
              ctx.functionName = ctx.functionItems[index].name
            },
            selectModule:function(index){
              this.cIndex = index
              this.moduleName = this.passport[index].name
            },
            toggleClick() {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
                setTimeout(()=>{
                  const e = document.createEvent("Event")
                  e.initEvent("resize", true, true);
                  window.dispatchEvent(e);
                },200)
            }
        }
    }

</script>
