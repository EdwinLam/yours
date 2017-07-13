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
        path: '/main',
        component: (resolve) => require(['./views/main.vue'], resolve)
    }

];
export default routers;