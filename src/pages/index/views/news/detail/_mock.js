const prefix = '/api';
const timeout = 300;
module.exports = {
  [`GET ${prefix}/api/articles/particulars`]: (req, res) => {
    setTimeout(() => {
      const results = {
        code: 0,
        msg: '',
        data: {
          articles: {
            id: '6108b5869bb9a044c48b1060',
            type: 1, // 1 新闻  2 通知
            title: '测试一', // 标题
            synopsis: '双方各发热袜服个软挖隔热瓦工', // 简介
            thumb: '', //缩率图
            publish_time: '2021-08-03T03:18:30.159Z', // 发布时间
            content:
              '<p>傻瓜挖人认购人隔热瓦分为五傻瓜挖人认购人隔热瓦分为五</p>', // 内容
          },
        },
      };
      res.send(results);
    }, timeout);
  },
};
