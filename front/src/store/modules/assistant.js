import * as types from '../mutation-types'
const state = {
    showMsg: "",
    type:"success",
    toggle:false,
    path:'',
    pathToggle:false
}

// getters
const getters = {
    showMsg:state=>state.showMsg,
}

// actions
const actions = {
}

const mutations = {
    [types.ASSISTANT_SHOW_MSG] (state,{msg,type}) {
      state.toggle=!state.toggle
      state.type=type
      state.showMsg=msg
    },
    [types.ASSISTANT_REDIRECT] (state,{path}) {
        state.path=path
        state.pathToggle=!state.pathToggle
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}