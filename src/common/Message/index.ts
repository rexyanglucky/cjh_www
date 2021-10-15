// import Message from '@/common/Message/'
// message.error('hi')
import './index.scss';

type MessageType = 'info' | 'error' | 'success';
class Message {
  styleName = 'ui-message';
  createDom(msg: string, type: MessageType, duration?: number) {
    const ele = document.createElement('div');
    const content = document.createElement('div');
    ele.className = `${this.styleName} ${this.styleName}--${type || 'info'}`;
    content.className = `${this.styleName}__content`;
    content.innerText = msg;
    ele.appendChild(content);
    document.body.appendChild(ele);
    setTimeout(() => {
      const elem = document.querySelector(`.${this.styleName}`);
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    }, duration || 3000);
  }

  info(msg: string, duration?: number, callback?: () => void) {
    this.msg('info', msg, duration, callback);
  }

  error(msg: string, duration?: number, callback?: () => void) {
    this.msg('error', msg, duration, callback);
  }

  success(msg: string, duration?: number, callback?: () => void) {
    this.msg('success', msg, duration, callback);
  }
  private msg(
    type: MessageType,
    msg: string,
    duration?: number,
    callback?: () => void
  ) {
    this.createDom(msg, type, duration);
    if (callback) {
      setTimeout(() => {
        callback();
      }, duration);
    }
  }
}

export default new Message();
