import _xjTool from './modules/xjTool'

export const xjTool = {
  install (Vue) {
    Vue.prototype.$xjNotify = _xjTool.notification
    Vue.prototype.$xjLoading = _xjTool.loading
  }
}