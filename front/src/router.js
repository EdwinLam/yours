import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const routers = [
  {
    path: '/login',
    component: (resolve) => require(['@/views/login/index.vue'], resolve)
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/404.vue'], resolve)
  },
  {
    path: '/weiboLogin',
    component: (resolve) => require(['@/views/weiboLogin.vue'], resolve)
  }

]
export default new VueRouter({
  mode: 'history',
  routes: routers
})
