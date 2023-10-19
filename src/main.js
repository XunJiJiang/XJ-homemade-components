import Vue from 'vue'
import App from './App.vue'
import store from './store';
import { xjTool } from './plugins'

Vue.config.productionTip = false

Vue.use(xjTool)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
