import { CURRENT_USER, LOGIN_TOKEN } from '@/utils/constant';
export const defaultAvatar =
  'https://q-independent.aixuexi.com/B:1027:K/1620316800/9dd6e261a80247959152ac6eb14b768c.jpg';
import * as cookie from './cookie';

export interface UserInfo {
  userType: 2 | 4 | 5; // 2 平台老师 4 老师 5 学生
  name: string;
  mobile: string;
  uid: number | string;
  nickname: string;
  headUrl: string;
}
export const UserRoleMap = {
  teacher: 2,
  student: 1,
};

/**
 * 1. 手动退出登录
 * 2. 账号被挤下线
 * 3. 未登录时访问需要登录的页面
 */
export function logout() {
  window.localStorage.removeItem(CURRENT_USER);
  sessionStorage.clear();
  cookie.delCookie(LOGIN_TOKEN);
  if ((window as any).CourseWebJSInterface) {
    (window as any).CourseWebJSInterface.loginOut();
  } else {
    location.replace('/account');
  }
}

/**
 * 判断是否登录
 */
export function isLogin() {
  const token = getLoginToken();
  if (token) {
    return true;
  }
  return false;
}
export function getLoginToken() {
  return cookie.getCookie(LOGIN_TOKEN);
}
export function setLoginToken(token: string) {
  cookie.setCookie(LOGIN_TOKEN, token);
}
export function setUserInfo(userInfo: Record<string, string>) {
  setLoginToken(userInfo.token);
  setCurrentUser(userInfo);
}
export function setCurrentUser(objUser: Record<string, string>) {
  objUser.headUrl = defaultAvatar;
  localStorage.setItem(CURRENT_USER, JSON.stringify(objUser));
}
// 获取用户信息，同步方法
export function getUserInfo(): UserInfo | null {
  const userInfoStorage = localStorage.getItem('user-info');
  return userInfoStorage ? JSON.parse(userInfoStorage) : null;
}
export function getUserType() {
  const userInfo = getUserInfo();
  if (userInfo) {
    return userInfo.userType;
  }
}
export function getUserId() {
  const userInfo = getUserInfo();
  console.log(userInfo);
  if (userInfo) {
    return userInfo.uid;
  }
}
export function isTeacher(): boolean {
  const userInfo = getUserInfo();
  if (userInfo) {
    if (userInfo.userType === UserRoleMap.teacher) {
      return true;
    }
  }
  return false;
}
export function isStudent(): boolean {
  const userInfo = getUserInfo();
  if (userInfo) {
    if (userInfo.userType === UserRoleMap.student) {
      return true;
    }
  }
  return false;
}

export function redirectToIndex(redrict?: string) {
  const { location } = window;
  if (isLogin()) {
    if (redrict) {
      location.replace(redrict);
      return;
    }
    location.replace('/gk/');
  } else {
    location.replace('/account');
  }
}
