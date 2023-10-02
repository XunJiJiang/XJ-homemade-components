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
  // 动画速度 （每帧之间）
  speed: Number,
  on: [{
    top?: String, // margin-top
    left?: String, // left: 50%，transform: translateX(-50%)时居中
    transform?: String,
    'transform-origin'?: String,
    opacity?: String,
    transition?: String,
    'transition-duration'?: String
  }],
  off: [{
    top?: String, // margin-top
    left?: String, // left: 50%，transform: translateX(-50%)时居中
    transform?: String,
    'transform-origin'?: String,
    opacity?: String,
    transition?: String,
    'transition-duration'?: String
  }] 
}
```