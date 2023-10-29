import Vue from 'vue'
// 用于创建 Store
// 引入 Vuex
import Vuex from 'vuex'
// 使用 Vuex
Vue.use(Vuex)

import user from './modules/user'
import getters from './getters'

// 创建 暴露 store
export default new Vuex.Store({
  modules: {
    user
  },
  getters
})