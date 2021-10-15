import dayjs from 'dayjs';

export function getUrlParameterByName(
  name: string,
  url?: string
): string | null {
  if (!url) url = window.location.href;
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return null;
  // return decodeURIComponent(results[2].replace(/\+/g, ' '));
  return decodeURIComponent(results[2]);
}

export function replaceUrlParam(
  paramName: string,
  paramValue: string,
  url = window.location.href
): string {
  if (paramValue == null) {
    paramValue = '';
  }
  const pattern = new RegExp(`\\b(${paramName}=).*?(&|#|$)`);
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, `$1${paramValue}$2`);
  }
  url = url.replace(/[?#]$/, '');
  return `${
    url + (url.indexOf('?') > 0 ? '&' : '?') + paramName
  }=${paramValue}`;
}

/**
 * 阻止回退
 */
export function preventGoBack(): void {
  if (window.history && window.history.pushState) {
    window.history.pushState(null, '', document.URL);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', document.URL);
    });
  }
}
export function preventDefault(ev: MouseEvent): void {
  ev.preventDefault();
  ev.stopPropagation();
}

export function secondToHour(second: number, unit: 'h' | 'm') {
  if (!second) return 0;
  let t = 0;
  unit = unit || 'h';
  switch (unit) {
    case 'h':
      t = second / 3600;
      break;
    case 'm':
      t = second / 60;
      break;
    default:
      t = second / 60;
      break;
  }
  let r = '0';
  if (unit === 'm') {
    r = t.toFixed(0);
  } else {
    r = t.toFixed(1);
  }
  if (r === '0.0') {
    return 0;
  }
  return r;
}

// 转换为东8区时间
export function getGMT8Time(time: Date) {
  const curDate = new Date(time);
  const curHour = curDate.getHours();
  let offsetZone = curDate.getTimezoneOffset() / 60;
  offsetZone = offsetZone + 8;
  if (offsetZone > 0) {
    // 西区
    curDate.setHours(curHour - offsetZone);
  } else {
    // 东区
    curDate.setHours(curHour + offsetZone);
  }
  return new Date(curDate);
}

/**
 * 设置指定元素全屏
 * @param {dom} ele
 */
export function fullScreen(ele?: HTMLElement) {
  const el = (ele as any) || (document.documentElement as any);
  const rfs =
    el.requestFullscreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullScreen;
  if (rfs) {
    rfs.call(el);
  } else if ((<any>window).ActiveXObject) {
    // for Internet Explorer
    // eslint-disable-next-line no-undef
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript != null) {
      wscript.SendKeys('{F11}');
    }
  }
}
/**
 * 设置指定元素退出全屏
 */
export function exitFullScreen() {
  const el = document as any;
  const fullscreenElement =
    el.fullscreenElement ||
    el.webkitFullscreenElement ||
    el.mozFullScreenElement /* Old Chrome, Safari and Opera syntax */ ||
    el.msFullscreenElement;
  if (!fullscreenElement) return; // 全屏元素不存在

  const cfs =
    el.exitFullscreen || el.mozCancelFullScreen || el.webkitCancelFullScreen;
  if (cfs) {
    cfs.call(el);
  } else if ((<any>window).ActiveXObject) {
    // for Internet Explorer
    // eslint-disable-next-line no-undef
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript != null) {
      wscript.SendKeys('{F11}');
    }
  }
}

export function distinct(arr: { [key: string]: any }[], keyField: string) {
  const temp = arr.reduce((p, c) => {
    p[c[keyField]] = c;
    return p;
  }, {});
  return Object.values(temp).flat();
}
// 是否触发移动端样式
export function isMobileScreen() {
  const cwidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    window.screen.width;
  return cwidth < 980;
}

// 是否移动设备
export function isMobileDevice() {
  console.log(window.navigator.userAgent);
  console.log(typeof window.orientation);
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

const isIOS =
  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// fix IOS手机唤起键盘，输入框失去焦点后页面元素点击事件位置偏移
export function fixIOSInput() {
  if (!isIOS) return;
  window.scroll(0, 0);
}

export function getValidateTimeStr(
  st: Date | dayjs.Dayjs | 'string' | number,
  et: Date | dayjs.Dayjs | 'string' | number,
  split?: string,
  format = 'YYYY.MM.DD HH:mm'
) {
  split = split || '~';
  let result = '';
  st = dayjs(st);
  et = dayjs(et);
  if (st.isSame(et, 'day')) {
    result = `${st.format(format)}${split}${et.format('HH:mm')}`;
  } else {
    result = `${st.format(format)}${split}${et.format(format)}`;
  }
  return result;
}

export function checkIllegalInput(str: string) {
  const reg =
    /[ _`~!@#,$%^&*()+=|{}':;'\\[\].<>/?~！@#¥%……&*（）——+|{}【】‘；：”“’。，、？]|\r|\t]/;
  return reg.test(str);
}

// 数字转换为汉字数字
export function convertNumber(value: number) {
  const str = value.toString();
  const len = str.length - 1;
  const idxs = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
  ];
  const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
    let pos = 0;
    if ($1[0] != '0') {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      const left = len - idx;
      const right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - (left % 4);
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return '';
      } else {
        return num[$1[0]];
      }
    }
  });
}
