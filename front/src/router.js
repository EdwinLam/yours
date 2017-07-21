import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);
const routers = [
    {
        path: '/',
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/login',
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/weiboLogin',
        component: (resolve) => require(['./views/weiboLogin.vue'], resolve)
    },
    {
        path: '/index',
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: '',
                component: resolve => require(['./views/user/list.vue'], resolve)
            },
            {
                path: '/user',
                component: resolve => require(['./views/user/list.vue'], resolve)
            }
        ]
    }

];
export default  new VueRouter({
    mode: 'history',
    routes: routers
});