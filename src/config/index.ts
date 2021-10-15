import curConfig from './config.export';

function genConfig() {
  const server = process.env.VUE_APP_SERVERKEY;
  const config = {
    baseUrl: '/api',
    loginUrl: '/loginapi',
    dataUrl: '/data',
    axxSSUrl: '/axx-ss-api',
    halfHour: 60 * 1000 * 30,
    homeDomain: `https://test${server}.byaiedu.cn`,
    sentry: {
      debug: 1, // 本地调试，启用时，会发请求上报
    },
  };
  if (process.env.NODE_ENV === 'production') {
    Object.assign(config, curConfig);
  } else {
    console.log('baseUrl: ', config.baseUrl);
  }
  return config;
}
const config = genConfig();
export default config;
