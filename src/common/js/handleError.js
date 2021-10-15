/* eslint-disable */
// import Vue from 'vue';
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';

const errorObject = {
  init() {
    // 监控js错误
    window.onerror = function (msg, _url, line, col, error) {
      // 采用异步的方式,避免阻塞
      setTimeout(() => {
        // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
        const defaults = {};
        col = col || (window.event && window.event.errorCharacter) || 0;
        if (error && error.stack) {
          // msg信息较少,如果浏览器有追溯栈信息,使用追溯栈信息
          defaults.msg = error.stack.toString();
        } else {
          defaults.msg = msg;
        }
        defaults.data = JSON.stringify({
          resourceUrl: _url,
          pageUrl: window.location.href,
          category: 'js error',
          line,
          col
        });
        defaults.t = new Date().getTime();
        defaults.level = 'error';
        console.log(defaults);
      }, 0);
      return false;
    };
    // 监控资源加载错误(img,script,css,以及jsonp)
    window.addEventListener('error', (e) => {
      const defaults = {};
      // defaults.msg = e.target.localName + ' is load error';
      defaults.type = 'resource';
      defaults.exception = JSON.stringify({
        target: e.target.localName,
        type: e.type,
        resourceUrl: e.target.currentSrc,
        category: 'resource'
      });
      // const {payload: {} } =
      if (e.target !== window) { // 抛去js语法错误
        // 把错误信息发送给后台
        // TODO 暂时不往后台发送资源加载错误日志
        // LogHelper.error(defaults);
      }
      e.preventDefault();
      return true;
    }, true);
    window.addEventListener('unhandledrejection', event => {
      console.log(event);
      event.preventDefault();
      return false;
    });
  }
}

