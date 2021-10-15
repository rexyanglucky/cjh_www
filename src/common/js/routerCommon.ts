/**
 * 单页router公用代码的抽取文件
 */
import Router, { RawLocation, Route } from 'vue-router';
import { isLogin, logout } from '@/utils/authority';

// 重写push，replace
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: RawLocation): Promise<Route> {
  return (<any>originalPush.call(this, location)).catch((err: any) => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function push(
  location: RawLocation
): Promise<Route> {
  return (<any>originalReplace.call(this, location)).catch((err: any) => err);
};

// eslint-disable-next-line prettier/prettier
export function routerHooks(
  router: Router,
  options?: {
    defaultBackground: string;
    authorityLogin?: boolean;
    pageTitle?: string;
    authority?: (
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
    ) => void;
  }
) {
  router.beforeEach((to: Route, from: Route, next) => {
    options = {
      defaultBackground: '#fff',
      authorityLogin: true,
      pageTitle: '创计划',
      ...options,
    };
    const meta = to.meta || {};
    const bg = meta.bg || options.defaultBackground;
    const title = (meta.title || '首页') + '-' + options.pageTitle;
    document.title = title;
    document.body.style.background = bg;
    if (options.authorityLogin) {
      if (isLogin()) {
        if (options && options.authority) {
          options.authority(to, from, next);
        } else {
          next();
        }
      } else {
        logout();
      }
    } else {
      next();
    }
  });
}
