function genServerConfig(serverkey) {
  let server = '';
  if (serverkey && serverkey !== 'prod') {
    // 如果是指定测试环境
    server = serverkey;
  }
  return {
    baseUrl: `https://gkuserapi${server}.aijianzi.com`,
    loginUrl: `https://gkweblogin${server}.aijianzi.com`,
  };
}
const configObj = {
  prod: {
    // 是否是生产环境
    isprod: true,
  },
  // 测试环境 通用配置
  serverTestCom: {
    isprod: false,
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
