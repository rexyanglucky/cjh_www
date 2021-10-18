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
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "page-index" */ '../views/index'),
      },
      {
        path: 'region',
        name: 'region',
        component: () =>
          import(/* webpackChunkName: "region" */ '../views/region'),
      },
      {
        path: 'competition',
        component: () =>
          import(/* webpackChunkName: "competition" */ '../views/competition'),
      },
      {
        path: 'history',
        component: () =>
          import(/* webpackChunkName: "history" */ '../views/history'),
      },
      {
        path: 'works',
        component: () =>
          import(/* webpackChunkName: "works" */ '../views/works'),
      },
    ],
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
