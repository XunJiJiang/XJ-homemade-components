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

