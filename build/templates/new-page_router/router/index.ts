import Vue from 'vue';
import VueRouter, { RouteConfig, RawLocation, Route } from 'vue-router';
import { routerHooks } from '@/common/js/routerCommon';

import T1 from '../views/T1.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/t1',
  },
  {
    path: '/t1',
    name: 't1',
    component: T1,
  },
  {
    path: '/t2',
    name: 't2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "t2" */ '../views/T2.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  // base: process.env.BASE_URL + 'demo',
  // ${base placeholder} 不可删除,生成模版占位符
  routes,
});
routerHooks(router);

export default router;
