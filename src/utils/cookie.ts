/**
 * 获取cookie
 * @param name string
 */
export function getCookie(name: string): string | null {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) return unescape(arr[2]);
  return null;
}

export function setCookie(
  name: string,
  value: string | number,
  expireDays?: number
) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  let expireDateKeyValue = '';
  if (expireDays) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expireDays);
    expireDateKeyValue =
      expireDays === null ? '' : `;expires=${expireDate.toUTCString()}`;
  }
  const cookieValue = [
    escape(value as string),
    expireDateKeyValue,
    ';path=/',
  ].join('');
  document.cookie = `${name}=${cookieValue}`;
}

// 删除cookie
export function delCookie(name: string) {
  setCookie(name, 0, -1);
}
