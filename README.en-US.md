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
The animation of notification's disappearance countdown visualization is modified to always be opaque (if automatic closing is set)
```

