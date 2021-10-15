import Vue from 'vue';
import App from './App.vue';
import '@/common/styles/global.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
