import './index.less'
import { v4 as uuidv4 } from 'uuid'
import xj_console from '../console'

class Message {
  constructor () {
    // 如果已经创建，则直接退出
    if (document.getElementById('messageBasicBox')) return
    const messageBasicBox = document.createElement('div')
    messageBasicBox.id = 'messageBasicBox'
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(messageBasicBox)
  }

  // public test: number = 1
  /**
   * 
   * @param {Object}
   * @param {String} message 消息
   * @param {String} type 类型 默认normal success warning error
   * @param {Number} duration 持续时间 最小值为 1000，小于1000会被强制转成1000
   * @param {Boolean} showClose 是否可以手动关闭
   * @returns {Promise} 自调用异步函数 返回Promise,没有有效的then
   */
  message ({ message, type = 'normal', duration = 3000, showClose = true }) {
    return (async () => {
      if (duration < 1000) {
        duration = 1000
        xj_console.warn('Message=>duration不能传入小于1000的值, 当前显示值为1000')
      }
      // 创建div然后往里面塞内容
      const messageBasicBox = document.getElementById('messageBasicBox')
      // 创建 message 盒子
      const uuid = uuidv4()
      const newDiv = document.createElement('div')
      newDiv.id = uuid
      newDiv.classList.add('ui-message')
      // 创建信息节点
      const newSpan = document.createElement('span')
      const text = document.createTextNode(message)
      newSpan.appendChild(text)
      newDiv.appendChild(newSpan)
      // 创建计时器保存位置
      let timeout
      // 创建关闭节点
      if (showClose) {
        const closeSvg = document.createElement('svg')
        closeSvg.classList.add('message-close')
        closeSvg.classList.add('icon')
        closeSvg.classList.add('ui-icon-close')
        closeSvg.classList.add('svg-icon')
        closeSvg.setAttribute('aria-hidden', 'true')
        const closeUse = document.createElement('use')
        closeUse.setAttribute('xlink:href', '#icon-close')
        closeSvg.appendChild(closeUse)
        newDiv.appendChild(closeSvg)
        newDiv.innerHTML += ''
      }
      // 判断类型
      switch (type) {
        case 'success':
          newDiv.classList.add('ui-message-success')
          break
        case 'warning':
          newDiv.classList.add('ui-message-warning')
          break
        case 'error':
          newDiv.classList.add('ui-message-error')
          break
        case 'normal':
        default:
          if (type !== 'normal') xj_console.errorTrace(`传入未知类型${type}`)
          newDiv.classList.add('ui-message-normal')
          break
      }
      messageBasicBox?.appendChild(newDiv)
      // 页面强制重载
      newDiv.offsetHeight
      // 运行出现动画
      // setTimeout(() => {
      newDiv.classList.add('ui-message-appear')
      // }, 10)
      // 运行消失动画
      timeout = setTimeout(() => {
        newDiv.classList.add('ui-message-disappear')
        // 删除元素
        setTimeout(() => {
          newDiv.remove()
        }, 400)
      }, duration)
      // 当鼠标移入时停止消失
      newDiv.addEventListener('mouseenter', () => {
        clearTimeout(timeout)
      })
      // 鼠标移出时
      newDiv.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            newDiv.classList.add('ui-message-disappear')
            // 删除元素
            setTimeout(() => {
              newDiv.remove()
            }, 400)
          }, duration)
      })
      // 为关闭按钮添加关闭事件
      if (showClose) {
        newDiv.getElementsByTagName('svg')[0].addEventListener('click', () => {
          clearTimeout(timeout)
          setTimeout(() => {
            newDiv.classList.add('ui-message-disappear')
            // 删除元素
            setTimeout(() => {
              newDiv.remove()
            }, 400)
          }, 0)
        })
      }
    })()
  }
}

export default new Message()

// 测试
document.addEventListener('keyup', (e) => {
  const test = new Message()
  switch (e.key) {
    case '5':
      test.message({
        message: 'message 测试-5',
        type: 'success',
        showClose: false
      })
      break
    case '6':
      test.message({
        message: 'message 测试-6',
        type: 'normal'
      })
      break
    case '7':
      test.message({
        message: 'message 测试-7',
        type: 'warning'
      })
      break
    case '8':
      test.message({
        message: 'message 测试-8',
        type: 'error'
      })
      break
  }
})