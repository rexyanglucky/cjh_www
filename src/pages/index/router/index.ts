import { routerHooks } from '@/common/js/routerCommon';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import NotFoundComponent from '../components/404';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "basic-layout" */ '../layouts/basicLayout'),
  },
];
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [...routes, { path: '*', component: NotFoundComponent }],
});

routerHooks(router, {
  // defaultBackground: '#FCFCFC',
  defaultBackground: '#FCFCFC',
  authorityLogin: false,
  pageTitle: '创计划',
});
export default router;
