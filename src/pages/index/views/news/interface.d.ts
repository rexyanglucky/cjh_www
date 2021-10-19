interface Article {
  id: string; //  id
  type: 1 | 2;
  title: string; // 标题
  synopsis: string; // 简述
  content: string;
  thumb: string; // 图片
  publish_time: string; // 时间
}

interface Pagination {
  max_items: number; //总条目数
  max_pages: number; // 总页数
  items_per_page: number; // 每页条目数量
  link_to: string;
  prev_page: number; //  上一页页码
  next_page: number; //  下一页页码
  current_page: number; // 当前页码
  qs: '';
  skip: number;
}
