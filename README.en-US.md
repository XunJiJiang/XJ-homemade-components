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

**2023-10-15**
```
Refactor notification.
Current progress remaining: the then() method returns the running value of the callback function
notification Transfer to Vuex
```

**2023-10-16**

```
Complete notification refactoring
```

How to use the new notification:
1. Create a new notification

   Pass in the configuration object, the object properties include:

   ```
   @param {string} title Optional.
   @param {string} message Required.
   @param {string} type Optional. The default is normal, other values include success, warning, and error.
   @param {string} location Optional. The default is left-bottom, other values include left-top right-top right-bottom left-bottom-1...
   @param {number} duration. The default is 3000. If it is 0, it will not be turned off automatically. Except for 0, the minimum value is 1000.
   @param {boolean} showClose. Whether it can be closed manually. The default is true. When turned on, moving the mouse over will stop the automatic shutdown timing.
   @param {boolean} userSelect Whether to restrict text selection. The default is true, which disables text selection
   @param {Function} callback A callback function that runs when the notification box is clicked. The callback receives a parameter in the notification position.
   ```

   ```js
   const notification = new Notification(option)
   ```

2. Available methods include：

   ```js
   /* When location has three values, such as left-bottom-1, it is absolute positioning and does not participate in dynamic notification location management. The setLocation method can be used to modify the location. */
   notification.setLocation(number)
   
   /* When callback is passed in, you can use the then() method to get the return value of callback */
   notification.then(Function)
   
   /* Used to close notification */
   notification.close()
   ```
   
   
**2023-10-17**
```
notification Refactoring completed, fix bugs, redraw styles
```