import Vue from 'vue'
import iView from 'iview'
import router from './router'
import store from './store/'
import fetch from './utils/fetch'
import App from './app.vue'
import 'iview/dist/styles/iview.css'
// import { sync } from 'vuex-router-sync'
import * as filters from './filters' // 全局filter
Vue.use(iView);
Vue.prototype.$http = fetch

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    next()
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
})
// sync(store, router)

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});