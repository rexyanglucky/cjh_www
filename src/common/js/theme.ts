import { post } from '@/utils/request';
import client from 'webpack-theme-color-replacer/client';
import { DefaultTheme, GreenTheme } from '@/common/js/themeConfig';
// export let curColor = '#4ca6ff';
// export let curColor = '#26c3ff';
export let curTheme: themeType = 2;

type themeType = 1 | 2;

// 动态切换主题色
export function changeThemeColor(themeType: themeType) {
  const options = {
    // newColors: [...forElementUI.getElementUISeries(newColor)],
    newColors: [...getThemeSeries(themeType)],
    changeUrl(cssUrl: string) {
      return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
    },
    // appendToEl: 'head',
    // newColors: [newColor],
  };
  return client.changer.changeColor(options, Promise).then(() => {
    curTheme = themeType;
    localStorage.setItem('theme', curTheme.toString());
  });
}
function getThemeSeries(themeType: 1 | 2) {
  if (themeType === 1) return DefaultTheme;
  else return GreenTheme;
}
export function initThemeColor() {
  // const savedColor = localStorage.getItem('theme_color');
  // if (savedColor) {
  //   curColor = savedColor;
  //   changeThemeColor(savedColor);
  // }
  getRemoteTheme();
}
function getRemoteTheme() {
  const themeMap = {
    1: '#26c3ff',
    2: '#52c41a',
  };
  post('/mainsiteApi/system/theme/used')
    .then((res: { data: { type: themeType } }) => {
      const themeType = res && res.data ? res.data.type : 1;
      // changeThemeColor(themeMap[themeType]);
      changeThemeColor(themeType);
    })
    .catch(() => {
      console.error('获取主题异常');
    });
}
