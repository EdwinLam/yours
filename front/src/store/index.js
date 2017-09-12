import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import visitor from './roles/visitor'
import guardian from './roles/guardian'
import librarian from './roles/librarian'

export default new Vuex.Store({
    modules: {
      visitor,guardian,librarian
    }
})