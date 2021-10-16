/** 所有页面基础功能
 * 添加vue日志
 * 根元素font-size计算
 * 根据localstorage设置皮肤
 */
// import '@babel/polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import LoadScript from 'vue-plugin-load-script';
import VueLazyload from 'vue-lazyload';
import './flexible';
import { elementInit } from './element';
import '@/assets/svg/icons/index';
import '@/common/styles/global.scss';
// import { initThemeColor } from './theme';
// import onLineTimeLog from './onLineTimeLog';

// 导入element
elementInit.init(Vue);
Vue.use(VueLazyload);
Vue.use(SvgIcon, {
  tagName: 'SvgIcon',
});
Vue.use(LoadScript);
Vue.prototype.$eventBus = new Vue();

export default {};
// console.log(process.env.VUE_APP_GIT_SHA);

// initThemeColor();
// onLineTimeLog.init();
