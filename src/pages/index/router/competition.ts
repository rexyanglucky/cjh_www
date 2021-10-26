export default [
  {
    path: 'competition',
    redirect: '/competition/intro',
    meta: {
      bg: '#FAF7FF',
    },
    component: () =>
      import(
        /* webpackChunkName: "competition-layout" */ '../views/competition/layout'
      ),
    children: [
      {
        path: 'intro',
        name: 'competition-intro',
        component: () =>
          import(
            /* webpackChunkName: "competition-intro" */ '../views/competition/intro'
          ),
      },
      {
        path: 'detail',
        name: 'competition-detail',
        component: () =>
          import(
            /* webpackChunkName: "competition-detail" */ '../views/competition/detail'
          ),
      },
      {
        path: 'reg',
        name: 'competition-reg',
        component: () =>
          import(
            /* webpackChunkName: "competition-reg" */ '../views/competition/reg'
          ),
      },
    ],
  },
];
