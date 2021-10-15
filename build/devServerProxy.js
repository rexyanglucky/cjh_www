const devEnv = process.env.DEV_ENV;
console.log('current development env: ', devEnv || '线上');

module.exports = {
  '/data': {
    target: devEnv
      ? `http://192.168.9.${devEnv}:8322`
      : 'https://userapi.aijianzi.com',
    changeOrigin: true, // 是否跨域
    pathRewrite: {
      '^/data': '', // 重写接口
    },
  },
  '/api': {
    target: devEnv
      ? `http://192.168.9.${devEnv}:8270`
      : 'https://gkuserapi.aijianzi.com',
    changeOrigin: true, // 是否跨域
    pathRewrite: {
      '^/api': '', // 重写接口
    },
  },
  '/loginapi': {
    target: devEnv
      ? `http://192.168.9.${devEnv}:8084`
      : 'https://gkweblogin.aijianzi.com',
    changeOrigin: true, // 是否跨域
    pathRewrite: {
      '^/loginapi': '', // 重写接口
    },
  },
  '/axx-ss-api': {
    target: 'https://sslive.aixuexi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/axx-ss-api': '', // 重写接口
    },
  },
  '/ajz/ajz-test': {
    target: 'http://live-pull-video-st.aixuexi.com',
    changeOrigin: true,
  },
};
