function genServerConfig(serverkey) {
  let server = '';
  if (serverkey && serverkey !== 'prod') {
    // 如果是指定测试环境
    server = serverkey;
  }
  return {
    baseUrl: `https://gkuserapi${server}.aijianzi.com`,
    loginUrl: `https://gkweblogin${server}.aijianzi.com`,
    dataUrl: `https://gkdata${server}.aijianzi.com`,
    axxSSUrl: 'https://sslive.aixuexi.com',
    schoolDomain: `https://gkschool${server}.aijianzi.com`,
    homeDomain: `https://gktest${server}.aijianzi.com`,
  };
}
const configObj = {
  prod: {
    ...genServerConfig('prod'),
    // 生产环境
    // 支付等待时长
    halfHour: 60 * 1000 * 30,
    // 是否是生产环境
    isprod: true,
    axxSSUrl: 'https://sslive.aixuexi.com',
    homeDomain: 'https://gk.aijianzi.com',
  },
  // 测试环境 通用配置
  serverTestCom: {
    // 支付等待时长
    halfHour: 60 * 1000 * 2,
    isprod: false,
    axxSSUrl: 'https://sslive.aixuexi.com',
  },
  /**
   * 设置当前服务器地址
   * @param {String} serverKey 服务器环境
   */
  setServerConfig(serverkey) {
    if (serverkey !== 'prod') {
      serverkey = serverkey.replace('server', '');
      this[`server${serverkey}`] = {
        ...genServerConfig(serverkey),
        ...this.serverTestCom,
      };
    }
  },
};
module.exports = configObj;
