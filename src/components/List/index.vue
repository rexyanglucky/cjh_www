<template lang="pug">
.list-wrap(:class='{ is_water_mark: isWaterMark }')
  slot(name='total', :page='page')
  .no-data(v-if='(!lists || lists.length === 0) && !loading')
    Empty(:desc='desc')
  ul.card-list(v-else)
    slot(name='header')
    slot(:item='item', :index='index', v-for='(item, index) in lists')
  .page-warp(v-if='page.pageMax > 1')
    //- Pagination(
    //-   :pageCurrent='query.currentPageNo',
    //-   :pageMax='page.pageMax',
    //-   pagination-position='center',
    //-   @current-change='handleCurrentChange'
    //- )
    el-pagination(
      background,
      layout='prev, pager, next',
      :current-page='page.current_page',
      :total='page.total'
      :page-size='pageSize'
      @current-change='handleCurrentChange'
    )
</template>

<script>
import Empty from '@/components/Empty';

export default {
  components: {
    Empty,
  },
  props: {
    apiMethod: {
      type: [Function, null],
      default: null,
    },
    afterFetch: {
      type: Function,
      // default: () => {
      //   return (list) => {};
      // },
    },
    convertData: {
      type: Function,
      // default: () => {
      //   return (data) => {};
      // },
    },
    queryParams: {
      type: [Object, Array],
    },
    pageSize: {
      default: () => 10,
      required: false,
      type: Number,
    },
    autoLoad: {
      default: () => false,
      required: false,
      type: Boolean,
    }, // 是否自动触发第一次加载
    desc: {
      default: () => '暂无内容',
      require: false,
      type: String,
    },
    isWaterMark: {
      default: () => false,
      require: false,
      type: Boolean,
    },
  },
  data() {
    return {
      query: {
        currentPageNo: 1,
        pageSize: this.pageSize,
      },
      page: {
        pageMax: 0,
        total: 0,
      },
      lists: [],
      loading: true,
    };
  },
  created() {
    this.$watch('queryParams', () => {
      this.refreshList();
    });
    if (this.autoLoad) {
      this.refreshList();
    }
  },
  methods: {
    handleCurrentChange(index) {
      this.query.currentPageNo = index;
      this.fetchList();
    },
    refreshList() {
      this.page.pageMax = 0;
      this.query.currentPageNo = 1;
      this.fetchList();
    },
    fetchList() {
      if (this.apiMethod && typeof this.apiMethod === 'function') {
        this.loading = true;
        let xhr = {
          ...this.query,
        };
        if (Array.isArray(this.queryParams)) {
          xhr = this.queryParams;
        } else {
          xhr = { ...xhr, ...this.queryParams };
        }
        this.apiMethod(xhr)
          .then((res) => {
            if (res && res.data) {
              if (this.convertData && typeof this.convertData === 'function') {
                this.convertData(res.data, res);
              }
              const {
                pagination: { max_items: totalNum, max_pages: maxPageNo },
                list,
              } = res.data;

              if (list) {
                this.lists = list;
                this.page.pageMax = maxPageNo;
                this.page.total = totalNum;
              } else {
                this.lists = res.data;
                this.page.total = this.lists.length;
              }
              if (this.afterFetch && typeof this.afterFetch === 'function') {
                this.afterFetch(this.lists, res);
              }
            } else {
              this.lists = [];
            }
          })
          .catch((err) => {
            this.lists = [];
            throw err;
            // Message.error(err.name);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    /**
     * 更新列表中某一行
     */
    updateListItem(index, item) {
      this.lists.splice(index, item);
    },
  },
};
</script>

<style lang="scss">
.list-wrap {
  height: calc(100% - 104px);
  // &.is_water_mark {
  //   background: url('~@/assets/images/prepare_empty.png') no-repeat;
  //   background-size: 21% auto;
  //   background-position: right bottom;
  // }
  .total-num {
    padding: 16px 0;
    text-align: right;
    font-size: 18px;
    margin-right: 30px;
    // z-index: 100;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .no-data {
    width: 100%;
    height: 100%;
  }
  .page-warp {
    width: 100%;
    margin: 44px 0 44px 0;
    text-align: center;
  }
}
</style>
