# XJ Dialog
**属性**
```vue
// 是否显示 Dialog，支持 .sync 修饰符
visible: {
  type: Boolean,
  default: false
},
// Dialog 的标题
title: {
  type: String
},
// Dialog 的宽度
width: {
  type: String,
  default: '50%'
},
// 当页面宽度太小时的宽度，如移动端
mobWidth: {
type: String,
default: '80%'
},
// Dialog CSS 中的 margin-top 值
top: {
  type: String,
  default: '15vh'
},
// 是否需要遮罩层
modal: {
  type: Boolean,
  default: true
},
// 是否在 Dialog 出现时将滚动锁定
lockScroll: {
  type: Boolean,
  default: true
},
// 是否可以通过点击 modal 关闭 Dialog
'close-on-click-modal': {
  type: Boolean,
  default: true
},
// 是否可以通过按下 ESC 关闭 Dialog
'close-on-press-escape': {
  type: Boolean,
  default: true
},
// 是否显示关闭按钮
'show-close': {
  type: Boolean,
  default: true
},
// 关闭前的回调，会暂停 Dialog 的关闭
'before-close': {
  type: Function
},
// 开启 关闭 动画配置
animationOptions: {
  // 数组里是动画的过程，若on长度大于1，则最后位置即为停止位置
  type: Object,
  default () {
    return {
      speed: 300,
      on: [{
        opacity: '0',
        top: 'calc(15vh - 10px)'
      }],
      off: [{
        opacity: '0',
        top: 'calc(15vh - 10px)'
      }]
    }
  }
}
```
`animationOptions`配置内容
```vue
{
  // 动画速度 （每个动画节点之间），若不写默认300
  speed: Number,
  on: [{
    top?: String, // margin-top
    left?: String, // left: 50%，transform: translateX(-50%)时居中
    transform?: String,
    'transform-origin'?: String,
    opacity?: String,
    transition?: String,
    speed: Number // 当前动画节点运行时常，若不写，则以外部 speed 为准
  }],
  off: [{
    top?: String, // margin-top
    left?: String, // left: 50%，transform: translateX(-50%)时居中
    transform?: String,
    'transform-origin'?: String,
    opacity?: String,
    transition?: String,
    speed: Number
  }] 
}
```