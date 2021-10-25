import { Component, Vue } from 'vue-property-decorator';
import List from '@/components/List';
import style from './index.module.scss';
import { ArticleQuery, getArticles } from '../news/list/services';
import dayjs from 'dayjs';

@Component({
  components: {
    'cjh-list': List,
  },
})
export default class Works extends Vue {
  query: Partial<ArticleQuery> = {
    type: 1, // 1  新闻   2  公告
    pages: 1,
    // pageSize: 5,
    isIndex: false,
    district: (this as any).$route.params.region,
  };
  renderBanner() {
    return (
      <div class={style.banner}>
        <div class={style.banner__inner}></div>
        <p class={style.banner__content}>作品赏析</p>
      </div>
    );
  }
  renderList() {
    return (
      <cjh-list
        class={style.works__list}
        autoLoad={true}
        apiMethod={getArticles}
        queryParams={this.query}
        convertData={(data: any) => {
          data.list = data.articles;
          (data.list || []).forEach((item: Article) => {
            item.publish_time = dayjs(item.publish_time).format(
              'YYYY年MM月DD日'
            );
          });
        }}
        pageSize={9}
        desc="desc"
      >
        {this.renderItem}
      </cjh-list>
    );
  }
  renderItem({ item, index }: { item: any; index: number }) {
    return (
      <li class={style.works__item}>
        {/* <img class={style.works__item_img} src={item.img}></img> */}
        <img
          class={style.works__item_img}
          src={require('@/assets/images/history/c1.png')}
        ></img>
        <div class={style.works__item_content}>
          <p class={style.works__item_title}>{item.title}</p>
          <p class={style.works__item_tips}>#创计划</p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div class={style.works}>
        {this.renderBanner()}
        {this.renderList()}
      </div>
    );
  }
}
