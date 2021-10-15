import { get, post } from '@/utils/request';

export function demoGet(params: any) {
  const url = '/demoget';
  return get(url, params);
}
export function demoPost(data: any) {
  const url = '/demopost';
  return post(url, data);
}
