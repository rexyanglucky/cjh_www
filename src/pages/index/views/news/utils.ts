import { RawLocation } from 'vue-router';

export const getNewsDetailLocation = (region: string, item: Article) => {
  return {
    name: item.type === 1 ? 'news-detail' : 'notice-detail',
    params: {
      region: region,
      id: item.id,
    },
  } as RawLocation;
};
