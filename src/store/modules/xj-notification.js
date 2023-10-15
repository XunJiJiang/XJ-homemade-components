import './xj-notification.less'
import { v4 as uuidv4 } from 'uuid'
// import xj_console from '../console'
// import message from '../message'

class NotificationList {
  static #length = {
    'left-bottom': { length: 0, list:[] },
    'left-top': { length: 0, list:[] },
    'right-bottom': { length: 0, list:[] },
    'right-top': { length: 0, list:[] }
  }

  /**
   * 修改 #length
   * @param {[string, string, number]} location
   * @param {'add' | 'reduce'} action 动作
   * @param {Notification} Notification Notification 实例
   */
  static setLength (location, action, Notification) {
    action === 'add' ? this.#length[location[0] + '-' + location[1]].length++ : this.#length[location[0] + '-' + location[1]].length--
    this.#setList(location, action, Notification)
    return this.#length[location[0] + '-' + location[1]].length
  }

  /**
   * 修改 NotificationList 数据
   * @param {[string, string, number]} location
   * @param {'add' | 'reduce'} action
   * @param {Notification} Notification
   */
  static #setList (location, action,Notification) {
    if (action === 'add') {
      this.#length[location[0] + '-' + location[1]].list.push({Notification, location})
      return
    }
    this.#length[location[0] + '-' + location[1]].list.splice(location[2] - 1, 1)
    for (let i = 0; i < this.#length[location[0] + '-' + location[1]].list.length; ++i) {
      this.#length[location[0] + '-' + location[1]].list[i].Notification.setLocation([location[0], location[1], i + 1])
    }
  }

  /**
   *  获取 #length
   * @param {[string, string, number]} location
   * @returns {number} 当前位置数量
   */
  static getLength (location) {
    return this.#length[location[0] + '-' + location[1]].length
  }
}

class Notification {
  // only read:number px
  static #rootHeight = 93
  // only read:number px
  static #rootWidth = 363

  /* 是否接入通知列表 NotificationList */
  #isAccessList

  /* 当前通知在当前所在位置的排位，不包括绝对位置的通知 */
  #ranking = {}

  /* 通知栏 根div: HTMLDivElement */
  #rootBox

  /* 倒计时进度条 div: HTMLDivElement */
  #countdownDiv

  /* 关闭按钮 */
  #closeSvg = null

  /*
   * 通知栏 rootBox: String
   * 倒计时进度条 countdownDiv: String
   */
  #uuid = {
    rootBox: '',
    countdownDiv: ''
  }

  /* 通知栏样式 */
  #boxStyle = {
    success: { 'background-color': 'rgba(153, 230, 115, .7)' },
    warning: { 'background-color': 'rgba(255, 203, 125, .7)' },
    error: { 'background-color': 'rgba(245, 108, 108, .7)' },
    normal: { 'background-color': 'rgba(0, 0, 0, .5)' }
  }

  /* 通知栏坐标
   * {'left | right': number, 'top | bottom': number}
   */
  #location = {}

  /* 保存计时器 */
  #timeout = {}

  /* 通知点击触发的函数: Function */
  #callback
  /* 记录callback被触发 */
  #isClick = false

  /**
   * notification 通知弹窗
   * @param param0
   * @param {string} title 标题 选填
   * @param {string} message 信息 必填
   * @param {string} type 类型 选填 默认normal   success warning error
   * @param {string} location 位置 选填 默认left-bottom   left-top right-top right-bottom left-bottom-1...
   * @param {number} duration 持续时间 默认3000 如果是0 则不会自动关闭 除 0 外 最小值为 1000，小于1000会被强制转成1000
   * @param {boolean} showClose 是否可以手动关闭 默认可以 开启时，鼠标移入会停止自动关闭计时
   * @param {boolean} userSelect 是否限制文本选中 默认 true 禁止选中文本
   * @param {Function | null} callback 点击通知框时运行的回调函数，默认为 null
   * @returns {Promise} 自调用异步函数 返回Promise,then 成功函数的参数为 callback函数 的返回值（如果有）
   */
  constructor ({title, message, type = 'normal' , location = 'left-bottom', duration = 3000, showClose = true, userSelect = true, callback = null}) {
    /* 检查数据合法性 */
    const {_type, _location, _duration, _showClose} = this.#examine(type, message, location, duration, showClose)
    if (this.#isAccessList) {
      this.#ranking[_location[0] + '-' + _location[1]] = NotificationList.setLength([_location[0], _location[1], NotificationList.getLength(_location)], 'add', this)
    }
    this.#create(title, message, _type, _duration, _showClose, userSelect, callback)
    this.#positionInitialization(_location)
    this.#setLocation(_location)
    this.#addEvent(_location, _duration, _showClose, callback)
    _duration !== 0 && (this.#timeout['close'] = setTimeout(() => {
      this.#remove(_location)
    }, _duration))
  }

  /**
   * 验证和处理数据
   * @param {string} type
   * @param {string} message
   * @param {string} location
   * @param {number} duration
   * @param {boolean} showClose
   * @returns {{_type: string, _location: [string, string, number], _duration: number, _showClose: boolean}}
   */
  #examine (type, message, location, duration, showClose) {
    /* 检查 duration 和 showClose */
    if (duration === 0) {
      /* 如果 duration 为0  则无视传入的 showClose 强制可以手动关闭 */
      if (showClose === false) throw new Error('Notification => duration 为0时, showClose 必须为 true')
      showClose = true
    } else if (duration < 1000) {
      throw new Error(`Notification => duration 的值小于1000 > ${ duration }`)
    }

    if (!message) throw new Error('Notification => message为必填内容')

    /* 检查 location */
    const _l = location.split('-')
    if (_l[2]) {
      (_l[2] = Number(_l[2]))
      this.#isAccessList = false
    } else {
      _l[2] = void 0
      this.#isAccessList = true
    }
    /* 判断 location 是否合法 */
    const isIllegal = !((_l[0].includes('left') || _l[0].includes('right')) && (_l[1].includes('bottom') || _l[1].includes('top')) && (typeof _l[2] === 'undefined' || (Number(_l[2]).toString() !== 'NaN' && Number(_l[2]) >= 0)))
    if (isIllegal) {
      throw new Error(`Notification => location 内容非法 > ${ location }`)
    }

    /* 检查 type */
    const _t = ['success', 'normal', 'warning', 'error'].filter(item => {
      if (item === type) return item
    })
    if (_t.length < 1) throw new Error(`Notification => type 内容非法 > ${ type }`)
    return { _type: type, _location: _l, _duration: duration, _showClose: showClose}
  }

  /**
   * 创建 notification
   * @param {string} title 标题
   * @param {string} message 信息
   * @param {string} type 类型
   * @param {number} duration 持续时间
   * @param {boolean} showClose 是否可以手动关闭
   * @param {boolean} userSelect 是否限制文本选中
  // * @param {Function | null} callback 点击通知框时运行的回调函数，默认为 null
   */
  #create (title, message, type, duration, showClose, userSelect) {
    // 创建 notification 盒子
    this.#uuid['rootBox'] = uuidv4()
    this.#rootBox = document.createElement('div')
    this.#rootBox.id = this.#uuid['rootBox']
    this.#rootBox.classList.add('xj-notification')
    this.#rootBox.classList.add()
    this.#rootBox.style.transformOrigin = 'center center'
    userSelect && (this.#rootBox.style['cursor'] = 'default')
    userSelect && (this.#rootBox.style['userSelect'] = 'none')
    /* 倒计时进度条 div */
    if (duration !== 0) {
      this.#uuid['countdownDiv'] = uuidv4()
      this.#countdownDiv = document.createElement('div')
      this.#countdownDiv.id = this.#uuid['countdownDiv']
      this.#countdownDiv.classList.add('xj-notification-countdown')
      this.#countdownDiv.style['background-color'] = this.#boxStyle[type]['background-color'] || this.#boxStyle['normal']['background-color']
      this.#countdownDiv.style['transition'] = `all ${ duration / 1000 }s linear`
      this.#rootBox.appendChild(this.#countdownDiv)
    }
    /* 标题 div */
    if (title) {
      const titleBox = document.createElement('div')
      titleBox.classList.add('xj-notification-title')
      titleBox.appendChild(document.createTextNode(title))
      this.#rootBox.appendChild(titleBox)
    }
    /* 信息节点 div */
    const messageBox = document.createElement('div')
    /*
     * 如果传入了 title，message 样式为 message
     * 否则 message 样式为 title
     */
    if (title) messageBox.classList.add('xj-notification-message')
    else messageBox.classList.add('xj-notification-title')
    messageBox.appendChild(document.createTextNode(message))
    this.#rootBox.appendChild(messageBox)
    switch (type) {
      case 'success':
      case 'warning':
      case 'error':
      case 'normal':
        this.#rootBox.classList.add(`xj-notification-${ type }`)
        break
    }
    /* 关闭节点 svg */
    if (showClose) {
      this.#closeSvg = document.createElement('svg')
      this.#closeSvg.classList.add('xj-notification-close')
      this.#closeSvg.classList.add('icon')
      this.#closeSvg.classList.add('xj-icon-close')
      this.#closeSvg.classList.add('svg-icon')
      this.#closeSvg.setAttribute('aria-hidden', 'true')
      this.#rootBox.appendChild(this.#closeSvg)
      this.#rootBox.innerHTML += ''
    }

    /*if (callback) {
      this.#callback = async (e) => {
        this.#isClick = true
        /!*
         * 判断点击事件出发位置
         * 若为 notification-close 关闭按钮 则不触发 callback
         *!/
        if (e.target.classList.contains('xj-notification-close')) return
        setTimeout(() => {
          this.#rootBox.style.transitionDuration = '.3s'
          // this._closeTransition(location, 0, countdownId)
        }, 180)
        // resolve(callback())
      }
    }*/
  }

  /**
   * 初始化 notification 位置
   * @param {[string, string, number]} location 位置
   */
  #positionInitialization (location) {
    typeof location[2] === 'undefined' ? (this.#location['ranking'] = this.#ranking[location[0] + '-' + location[1]]) : this.#location['ranking'] = location[2]
    this.#location[location[0]] = - Notification.#rootWidth // px
    this.#location[location[1]] = 16 + (this.#location['ranking'] - 1) * Notification.#rootHeight // px
    this.#rootBox.style[location[0]] = this.#location[location[0]] + 'px'
    this.#rootBox.style[location[1]] = this.#location[location[1]] + 'px'
    document.body.appendChild(this.#rootBox)
  }

  setLocation (location) {
    this.#setLocation(location)
    this.#ranking[location[0] + '-' + location[1]] = location[2]
  }


  /**
   * 修改 notification 位置
   * @param {[string, string, number | undefined]} location 位置 left-top right-top right-bottom left-bottom-1...
   */
  #setLocation (location) {
    const _oldLocation = this.#location
    /* 设置 notification 位置 */
    !location[2] && (location[2] = this.#ranking[location[0] + '-' + location[1]])
    /* 设置位置 */
    this.#location[location[0]] = 18 // px
    this.#location[location[1]] = 16 + (location[2] - 1) * Notification.#rootHeight // px
    this.#locationUpdate(_oldLocation, 300)
  }

  /**
   * 带过渡的位置更新
   * @param {{'left | right': number, 'top | bottom': number}} _oldLocation 旧的位置
   * @param {number} operationHours 运行时间 ms
   */
  #locationUpdate (_oldLocation, operationHours) {
    const _nowLocation = _oldLocation
    const _change = {}
    for (let key in _oldLocation) {
      if (key === 'ranking') continue
      _change[key] = this.#location[key] - _oldLocation[key]
    }
    let _over = false
    const _run = () => {
      for (let key in _nowLocation) {
        if (key === 'ranking') continue
        if ((this.#location[key] - _oldLocation[key] >= 0 && this.#location[key] - _nowLocation[key] < 1) || (this.#location[key] - _oldLocation[key] <= 0 && this.#location[key] - _nowLocation[key] > 1)) {
          this.#rootBox.style[key] = this.#location[key] + 'px'
          _over = true
        } else {
          _nowLocation[key] += _change[key] / operationHours
          this.#rootBox.style[key] = _nowLocation[key] + 'px'
        }
      }
      !_over && requestAnimationFrame(_run)
    }
    requestAnimationFrame(_run)
  }

  /**
   * 删除 notification
   * @param {[string, string, number | undefined]} location
   */
  #remove (location) {
    const _oldLocation = this.#location
    this.#isAccessList ? (this.#location['ranking'] = this.#ranking[location[0] + '-' + location[1]]) : this.#location['ranking'] = location[2]
    this.#location[location[0]] = - Notification.#rootWidth // px
    this.#location[location[1]] = 16 + (this.#location['ranking'] - 1) * Notification.#rootHeight // px
    // this.#rootBox.style[location[0]] = this.#location[location[0]] + 'px'
    // this.#rootBox.style[location[1]] = this.#location[location[1]] + 'px'
    this.#locationUpdate(_oldLocation, 300)
    if (this.#isAccessList) NotificationList.setLength([location[0], location[1], this.#ranking[location[0] + '-' + location[1]]], 'reduce', this)
    setTimeout(() => {
      this.#rootBox.remove()
    }, 300)
  }

  #addEvent (location, duration, showClose, callback) {
    console.log('#addEvent')
    if (callback) {
      this.#rootBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('xj-notification-close')) return
        callback()
        setTimeout(() => {
        this.#timeout['close'] && clearTimeout(this.#timeout['close'])
        this.#remove(location)
        }, 300)
      })
    }
    this.#rootBox.addEventListener('mouseenter', () => {
      clearTimeout(this.#timeout['close'])
    })
    this.#rootBox.addEventListener('mouseleave', () => {
      duration !== 0 && (this.#timeout['close'] = setTimeout(() => {
        this.#remove(location)
      }, duration))
      this.#rootBox.style['transition-duration'] = '.4s'
      this.#rootBox.style['transform'] = 'scale(100%)'
    })
    this.#rootBox.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('xj-notification-close')) return
      this.#rootBox.style['transition-duration'] = '.1s'
      this.#rootBox.style['transform'] = 'scale(95%)'
    })
    this.#rootBox.addEventListener('mouseup', () => {
      this.#rootBox.style['transition-duration'] = '.4s'
      this.#rootBox.style['transform'] = 'scale(100%)'
    })
    if (showClose) {
      console.log(this.#closeSvg)
      this.#rootBox.addEventListener('click', (e) => {
        if (!e.target.classList.contains('xj-notification-close')) return
        this.#timeout['close'] && clearTimeout(this.#timeout['close'])
        this.#remove(location)
      })
    }
  }

  /**
   * 自动消失动画
   * @param {string} location 位置 left right
   * @param {number} duration 自动关闭时间
   * @param {string} countdownId newDiv 唯一标识
   * @param {Function | null} resolve 用于完成 Promise
   */
/*  #closeTransition (location, duration, countdownId, resolve = null) {
    // if (duration !== 0) {
    //   const #countdownDiv = newDiv.getElementsByClassName(countdownId)[0]
    //   // #countdownDiv.style.opacity = '1'
    //   #countdownDiv.style.transition =  `all ${duration/1000}s linear`
    //   #countdownDiv.style.width = '100%'
    // }
    // return setTimeout(() => {
    //   newDiv.classList.add(`ui-notification-${location.split('-')[0]}-disappear`)
    //   // 删除元素
    //   setTimeout(() => {
    //     newDiv.remove()
    //     resolve && resolve('Close')
    //   }, 400)
    // }, duration)
  }*/
}

// const _Notification = new Notification()
export default {
  namespaced: true,
  actions: {
    'xjNotification' (context, v) {
      new Notification(v)
    }
  },
  state: {
    notification: []
  }
}
