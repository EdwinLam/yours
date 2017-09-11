import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import visitor from './modules/visitor'
import guardian from './modules/guardian'
import librarian from './modules/librarian'
import getters from './getters'

export default new Vuex.Store({
    modules: {
      visitor,guardian,librarian
    },
    getters
})