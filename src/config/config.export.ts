const configObj = {
  prod: {
    baseUrl: 'https://gkuserapi.aijianzi.com',
    loginUrl: 'https://gkweblogin.aijianzi.com',
    dataUrl: 'https://gkdata.aijianzi.com',
    axxSSUrl: 'https://sslive.aixuexi.com',
    schoolDomain: 'https://gkschool.aijianzi.com',
    homeDomain: 'https://gk.aijianzi.com',
    halfHour: 1800000,
    isprod: true,
  },
  serverTestCom: {
    halfHour: 120000,
    isprod: false,
    axxSSUrl: 'https://sslive.aixuexi.com',
  },
};

export default configObj.prod;
