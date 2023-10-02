import './index.less'
import { v4 as uuidv4 } from 'uuid';
import consoleOutput from '../consoleOutput'

class Message {
  constructor () {
    // 如果已经创建，则直接退出
    if (document.getElementById('messageBasicBox')) return;
    const messageBasicBox = document.createElement('div');
    messageBasicBox.id = 'messageBasicBox';
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(messageBasicBox);
  }

  // public test: number = 1;
  /**
   * 
   * @param {Object}
   * @param {String} message 消息
   * @param {String} type 类型 默认normal success warning error
   * @param {Number} duration 持续时间 最小值为 1000，小于1000会被强制转成1000
   * @returns {Function()} 返回一个自调用函数
   */
  message ({ message, type = 'normal', duration = 3000 }) {
    return (async () => {
      if (duration < 1000) {
        duration = 1000;
        consoleOutput.warn('Message=>duration不能传入小于1000的值, 当前显示值为1000');
      }
      // 创建div然后往里面塞内容
      const messageBasicBox = document.getElementById('messageBasicBox');
      // 创建 message 盒子
      const uuid = uuidv4();
      const newDiv = document.createElement('div');
      newDiv.id = uuid;
      newDiv.classList.add('ui-message');
      // 创建信息节点
      const newSpan = document.createElement('span');
      const text = document.createTextNode(message);
      newSpan.appendChild(text);
      newDiv.appendChild(newSpan);
      // 判断类型
      switch (type) {
        case 'success':
          newDiv.classList.add('ui-message-success');
          break;
        case 'warning':
          newDiv.classList.add('ui-message-warning');
          break;
        case 'error':
          newDiv.classList.add('ui-message-error');
          break;
        case 'normal':
        default:
          if (type !== 'normal') consoleOutput.errorTrace(`传入未知类型${type}`);
          newDiv.classList.add('ui-message-normal'); 
          break;
      }
      messageBasicBox?.appendChild(newDiv);
      // 页面强制重载
      newDiv.offsetHeight;
      // 运行出现动画
      // setTimeout(() => {
      newDiv.classList.add('ui-message-appear'); 
      // }, 10);
      // 运行消失动画
      setTimeout(() => {
        newDiv.classList.add('ui-message-disappear');
        // 删除元素
        setTimeout(() => {
          newDiv.remove();
        }, 400);
      }, duration);
    })()
  }
}

export default new Message();

// 测试
document.addEventListener('keyup', (e) => {
  const test = new Message();
  switch (e.key) {
    case '5':
      test.message({
        message: 'message 测试-5',
        type: 'success'
      });
      break;
    case '6':
      test.message({
        message: 'message 测试-6',
        type: 'normal'
      });
      break;
    case '7':
      test.message({
        message: 'message 测试-7',
        type: 'warning'
      });
      break;
    case '8':
      test.message({
        message: 'message 测试-8',
        type: 'error'
      });
      break;
  }
})