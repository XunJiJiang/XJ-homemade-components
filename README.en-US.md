# xj-homemade-components

[中文](README.md) | English | [日本語](README.jp.md)

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

## About

This is a test homemade component

There may be irregularities in file configuration.

Currently only supported:

- dialog (Some functions imitate element)
- notification (Function imitates element)
- message (Style and functionality imitate element)
- console output

## Update Record

> Recording begins on October 6, 2023

**2023-10-6**

```
Fixed the bug that the dialog cannot be scrolled when it is higher than the view window, resulting in the inability to display beyond the position.
The animation of Notification's disappearance countdown visualization is modified to always be opaque (if automatic closing is set)
```

**2023-10-10**

```
Optimize dialog. Add scrolling and rebound effects.
Fix some bugs.
```

**2023-10-12**

```
Notification adds callback attribute. The type of callback is function.
This function will be run when the Notification box is clicked, and its return value will be used as a parameter of the successful function in the then of the Notification's return value.
If the notification is closed, the parameter of the then function as a success in the Notification's return value is 'Close'.
```


**2023-10-13**
```
Notification adds click animation.
Notification adds userSelect attribute. This attribute receives a boolean. When the value is true, the text cannot be selected. Defaults to true.
The text of Message cannot be selected.
```