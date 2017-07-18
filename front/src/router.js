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
export default routers;