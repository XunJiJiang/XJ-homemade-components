import Vue from 'vue';
import xj_notification from './modules/xj-notification'
// 用于创建 Store
// 引入 Vuex
import Vuex from 'vuex';
// 使用 Vuex
Vue.use(Vuex);

// 创建 暴露 store
export default new Vuex.Store({
  modules: {
    xj_notification
  }
})