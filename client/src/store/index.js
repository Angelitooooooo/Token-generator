import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'logs', 
    }),
  ],
  state: {
    isLoggin:false,
    token:null,
    refreshToken:null,
  },
  mutations: {
    "LOGGIN"(state, data) {
      state.isLoggin = data
    },
    
    "UPDATE_TOKEN"(state, data) {
      state.token = data
    },
    "UPDATE_RTOKEN"(state, data) {
      state.refreshToken = data
    },
  },
  actions: {
  },
  modules: {
  }
})
