import { menu } from '@/pages/index/components/header';
import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/List';
import style from './index.module.scss';
import { ArticleQuery, getArticles } from './services';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import { getNewsDetailLocation } from '../utils';
import dayjs from 'dayjs';
import FriendLink from '@/pages/index/components/friend-link';

@Component({
  components: {
    'cjh-list': List,
  },
})
export default class NewsList extends Vue {
  menus: Array<menu> = [
    {
      name: '新闻动态',
      type: 'link',
      link: 'news-list',
    },
    {
      name: '通知公告',
      type: 'link',
      link: 'notice-list',
    },
  ];
  queryApi = '/api/articles';
  query: Partial<ArticleQuery> = {
    type: 1, // 1  新闻   2  公告
    pages: 1,
    // pageSize: 5,
    isIndex: false,
    district: (this as any).$route.params.region,
  };
  created() {
    this.init();
  }
  init() {
    const { meta } = (this as any).$route;
    this.query = { ...this.query, type: meta.type };
  }

  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext<any>) {
    // const { meta } = to;
    // console.log(to);
    // if (meta) {
    //   this.query.type = meta.type;
    // }
    // next();
  }

  @Watch('$route')
  routeUpdate() {
    this.init();
  }
  renderBanner() {
    return (
      <div class={style.banner}>
        <p class={style.banner_title}>新闻资讯</p>
      </div>
    );
  }
  renderTab() {
    return (
      <ul class={style.tabs}>
        {this.menus.map((m) => (
          <router-link
            class={style.tabs__item}
            tag="li"
            to={{
              name: m.link,
              params: (this as any).$route.params,
            }}
            exact
            active-class={style.tabs__item_active}
          >
            {m.name}
          </router-link>
        ))}
      </ul>
    );
  }
  renderItem({ item, index }: { item: Article; index: number }) {
    return (
      <article
        class={[style.news__item, item.type == 2 ? style.notice : '']}
        onClick={() => {
          const { params } = (this as any).$route;
          const obj = getNewsDetailLocation(params.region, item);
          ((this as any).$router as VueRouter).push(obj);
        }}
      >
        <p class={style.news__item_title}>{item.title}</p>
        <p class={style.news__item_content}>{item.synopsis}</p>
        <p class={style.news__item_time}>{item.publish_time}</p>
      </article>
    );
  }

  renderList() {
    return (
      <cjh-list
        class={style.news__list}
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
        pageSize={5}
        desc="desc"
        // scopedSlots={
        //   {
        //     default: ({item, index}: {item: Article, index: number}) => {
        //       console.log(item);
        //       return <div>
        //         {item}
        //         {item.title}
        //       </div>
        //     }
        //   }
        // }
      >
        {this.renderItem}
      </cjh-list>
    );
  }
  render() {
    return (
      <div class={style.news}>
        {this.renderBanner()}
        {this.renderTab()}
        {this.renderList()}
        <FriendLink></FriendLink>
      </div>
    );
  }
}
