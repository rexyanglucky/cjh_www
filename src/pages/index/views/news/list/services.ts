import { get, post } from '@/utils/request';

export interface ArticleQuery {
  type: 1 | 2; // 1  新闻   2  公告
  pages: number;
  pageSize: number;
  isIndex: boolean;
  district: number;
}
export function getArticles(params: ArticleQuery) {
  const url = '/api/articles';
  return get(url, params);
}
