import {
  getLoginToken,
  isTeacher,
  logout,
  redirectToIndex,
} from '@/utils/authority';
import { rolePage, Role, _rolePage } from './rolePage';

const checkObj = {
  checkLogin(pathname: keyof _rolePage) {
    // const localInfo = localStorage.getItem('user-info');
    const token = getLoginToken();
    let roleTemp = Role.accessWhite;
    if (rolePage[pathname]) {
      const roles = rolePage[pathname];
      // if (localInfo && token) {
      if (token) {
        roleTemp = Role.student;
        const isCoach = isTeacher();
        roleTemp = isCoach ? Role.teacher : Role.student;
        // 无权限
        if (roles.indexOf(Role.common) < 0 && roles.indexOf(roleTemp) < 0) {
          redirectToIndex();
        }
      } else {
        // 如果没有白名单权限
        if (roles.indexOf(roleTemp) < 0) {
          logout();
        }
      }
    }
  },
  checkEntry() {
    const pathname = window.location.pathname.replace(/\/$/, '');
    this.checkLogin(pathname);
    document.body.style.visibility = 'visible';
  },
};
document.body.style.visibility = 'hidden';
checkObj.checkEntry();
