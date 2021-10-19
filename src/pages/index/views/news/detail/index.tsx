import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import style from './index.module.scss';
import { getArticleDetail } from './services';

@Component
export default class NewsDetail extends Vue {
  article: Article | null = null;
  async created() {
    const { id } = ((this as any).$route as Route).params;
    const res = await getArticleDetail({ id });
    const { data } = res;
    this.article = data.articles;
  }
  renderBreadcrumb() {
    const $route = (this as any).$route as Route;
    const { meta = {}, params } = $route;
    return (
      <div class={style.breadcrumb_wrap}>
        <el-breadcrumb
          class={style.breadcrumb}
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item
            to={{
              name: 'news-list',
              params: {
                region: params.region,
              },
            }}
          >
            新闻资讯
          </el-breadcrumb-item>
          {meta.type === 1 && (
            <el-breadcrumb-item
              to={{
                name: 'news-list',
                params: {
                  region: params.region,
                },
              }}
            >
              {' '}
              新闻动态
            </el-breadcrumb-item>
          )}
          {meta.type === 2 && (
            <el-breadcrumb-item
              to={{
                name: 'notice-list',
                params: {
                  region: params.region,
                },
              }}
            >
              {' '}
              通知公告
            </el-breadcrumb-item>
          )}
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    );
  }
  renderArticle() {
    const item = this.article;
    if (item) {
      return (
        <article class={style.article}>
          <p class={style.article_title}>{item.title}</p>
          <p class={style.article_time}>{item.publish_time}</p>
          <p class={style.article_content} domPropsInnerHTML={item.content}></p>
        </article>
      );
    }
  }
  render() {
    return (
      <div class={style.news_deatil}>
        {this.renderBreadcrumb()}
        {this.renderArticle()}
      </div>
    );
  }
}
