import { get, post } from '@/utils/request';

export function getArticleDetail(params: { id: string }) {
  const url = '/api/articles/particulars';
  return get(url, params);
}
