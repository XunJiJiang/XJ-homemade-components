# XJ-自制组件

中文 | [English](README.en-US.md) | [日本語](README.jp.md)

## 项目设置
```shell
npm install
```

### 用于开发的编译和热重载
```shell
npm run serve
```

### 编译并缩小以用于生产
```shell
npm run build
```

## 关于

这是一个测试性的自制组件

文件配置等可能存在不规范

当前仅支持：

- dialog 弹窗(部分功能模仿element)
- notification 消息通知(功能模仿element)
- message 顶部信息弹窗(风格和功能模仿element)
- console 控制台输出

## 更新记录

> 从2023年10月6日开始记录

**2023-10-6**

```
修复了dialog 在高于视窗时无法滚动，导致超出位置无法显示的bug
notification 的消失倒计时可视化的动画修改为始终不透明（如果设置了自动关闭）
```

**2023-10-10**

```
dialog优化,增加滚动及回弹效果
修复部分错误
```

**2023-10-12**

```
notification 通知 新增 callback 属性，类型为函数
这个函数将会在通知框被点击时运行，其返回值会在 notification 的返回值的 then 中作为成功的函数的参数
若通知被关闭，notification 的返回值的 then 中作为成功的函数的参数为 'Close'
```

**2023-10-13**
```
notification 新增 点击动画
notification 新增userSelect属性，接收一个 boolean，值为true时文本不可被选中。默认为 true
message 的文本不可被选中
```

**2023-10-15**
```
重构 notification。
当前进度剩余：then返回 回调函数的运行值
notification 转移至 vuex
```

**2023-10-16**

```
完成 notification 重构 
```

新的 notification 的使用方法：
1. 新建一个 notification 

   传入配置对象，对象属性包括：

   ```
   @param {string} title 标题 选填
   @param {string} message 信息 必填
   @param {string} type 类型 选填 默认normal，其他值包括success、warning、error。
   @param {string} location 位置 选填 默认left-bottom，其他值包括left-top right-top right-bottom left-bottom-1...
   @param {number} duration 持续时间 默认3000，如果是0，则不会自动关闭 除 0 外 最小值为 1000
   @param {boolean} showClose 是否可以手动关闭 默认可以 开启时，鼠标移入会停止自动关闭的计时
   @param {boolean} userSelect 是否限制文本选中 默认为true，禁止选中文本
   @param {Function} callback 点击通知框时运行的回调函数，callback 接收一个 notification 位置的参数
   ```

   ```js
   const notification = new Notification(option)
   ```

2. 可使用的方法包括：

   ```js
   /* 当 location 为三个值，如 left-bottom-1， 此时为绝对定位，不参与动态通知位置管理，且可使用setLocation方法修改位置 */
   notification.setLocation(number)
   
   /* 当传入 callback 时，可使用then方法获取 callback 的返回值 */
   notification.then(Function)
   
   /* 用于关闭 notification  */
   notification.close()
   ```
   
**2023-10-17**
```
notification 重构完成，修改bug，重绘样式
```

**2023-10-27**
```
notification 添加catch方法，用于处理callback函数未触发的情况
由catch方法传入的方法，在被调用时传入一个对象
{
  message: string,
  code: number // 0: 关闭计时结束; 1: 用户点击关闭按钮; 2: close 方法关闭
}

新增加载动画

新增投票列表(未完成)
```