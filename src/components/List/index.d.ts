import Vue, { PluginFunction } from 'vue';

export default class List extends Vue {
  apiMethod?: () => void;
  afterFetch?: (list: [], res: any) => any;
  queryParams?: any;
  pageSize?: number;
  scopedSlots?: any;
  autoLoad?: boolean;
  refreshList(): void;
  fetchList(): void;
  updateListItem(index: number, item: any): void;
}
