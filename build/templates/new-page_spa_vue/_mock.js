const prefix = '/api';
const timeout = 300;
module.exports = {
  [`GET ${prefix}/demo`]: (req, res) => {
    setTimeout(() => {
      const results = {
        code: 0,
        msg: '成功',
        desc: '成功',
        trace: null,
        data: {},
      };
      res.send(results);
    }, timeout);
  },
};
