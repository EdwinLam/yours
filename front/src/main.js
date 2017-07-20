import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store/'
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(iView);

Vue.prototype.$http = Util.ajax
Vue.prototype.$Util = Util

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);

    //权限验证
    const data=JSON.parse(sessionStorage.getItem('storeData'));
    if(data != null){
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt; // 注意Bearer后有个空格
        next()
    }else if(to.path == '/login'){
        next()
    }else{
        next('/login')
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});