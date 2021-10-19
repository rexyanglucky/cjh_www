const prefix = '/api';
const timeout = 300;
module.exports = {
  [`GET ${prefix}/api/articles`]: (req, res) => {
    const { query } = req;
    console.log(query);
    setTimeout(() => {
      const results = {
        code: 0,
        msg: '',
        data: {
          pagination: {
            max_items: 19, //总条目数
            max_pages: 7, // 总页数
            items_per_page: 3, // 每页条目数量
            link_to: '',
            prev_page: 3, //  上一页页码
            next_page: 5, //  下一页页码
            current_page: 4, // 当前页码
            qs: '',
            skip: 9,
          },
          articles: new Array(10).fill({
            id: '610a54532a732525f848bf56', //  id
            type: 1,
            title: '人教社回应英语教材出现“Wu Yifan” ：与涉案艺人无关',
            synopsis:
              '新京报讯（记者刘洋）近期，网友反映人教版《义务教育教科书 英语》（PEP）（三年级起点）教材中的拼音名与某吴姓涉案艺人名字同音。今天（8月3日），人民教育出版社（以下简称“人教社”）通过官方公众号回应表示，书中对应的中文名是“吴一凡”，拼音名字从2001年开始沿用至今，已经20年，与近些年才出现在公众视野的某涉案艺人无任何关联。',
            thumb: '',
            publish_time: '2021-08-04T08:48:19.029Z',
          }),
        },
      };
      res.send(results);
    }, timeout);
  },
};
