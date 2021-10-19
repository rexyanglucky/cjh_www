import { Component, Vue } from 'vue-property-decorator';
// import Swiper from 'swiper';
// import Swiper JS
import Swiper from 'swiper';
// Import Swiper Vue.js components
//  import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
//  import 'swiper/css';
// import Swiper styles
//  import 'swiper/css';
import style from './index.module.scss';
import img from '@/assets/images/region/main.png';
import { getNewsDetailLocation } from '../news/utils';
import { ArticleQuery, getArticles } from '../news/list/services';
import dayjs from 'dayjs';
import FriendLink from '@/pages/index/components/friend-link';
@Component
export default class Preparation extends Vue {
  news: Array<Article> = [];
  notices: Array<Article> = [];

  async created() {
    const query = {
      type: 1, // 1  新闻   2  公告
      pages: 1,
      pageSize: 4,
      isIndex: true,
      district: (this as any).$route.params.region,
    } as ArticleQuery;
    getArticles(query).then((res) => {
      this.news = (res.data.articles || []).map((item: Article) => ({
        ...item,
        publish_time: dayjs(item.publish_time).format('YYYY年MM月DD日'),
        thumb: require('@/assets/images/region/news_1.png'),
      }));
    });
    getArticles({
      ...query,
      type: 2, // 1  新闻   2  公告
      pageSize: 5,
    }).then((res) => {
      this.notices = (res.data.articles || []).map((item: Article) => ({
        ...item,
        publish_time: dayjs(item.publish_time).format('YYYY年MM月DD日'),
        thumb: require('@/assets/images/region/news_1.png'),
      }));
    });
  }
  mounted() {
    const swiper = new Swiper(`.${style.highlights__list}`, {
      slidesPerView: 4,
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: `.${style.highlights__list_control_next}`,
        prevEl: `.${style.highlights__list_control_prev}`,
      },
    });
  }
  redirectToDetail(item: Article) {
    const { id } = (this as any).$route.query;
    (this as any).$router.push(getNewsDetailLocation(id, item));
  }
  renderMainImg() {
    return (
      <div class={style.main_img}>
        <img src={img} alt="" />
      </div>
    );
  }
  renderNews() {
    const news = this.news;
    return (
      <section class={[style.block, style.news]}>
        <p class={style.block__title_wrap}>
          <span class={style.block__title}>新闻资讯</span>
          <span
            class={style.block__more}
            onClick={() => {
              const { id } = (this as any).$route.query;
              (this as any).$router.push({
                name: 'news-list',
                params: {
                  region: id,
                },
              });
            }}
          >
            <span>查看更多</span>
            <img src={require('@/assets/images/region/more.png')} alt="" />
          </span>
        </p>
        <ul class={style.news__list}>
          {news.map((n) => (
            <li
              class={style.news__item}
              onClick={() => {
                this.redirectToDetail(n);
              }}
            >
              <img class={style.news__item_img} src={n.thumb} alt="" />
              <p class={style.news__item_name}>{n.title}</p>
              <p class={style.news__item_time}>发布时间：{n.publish_time}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  renderNotice() {
    const notices = this.notices;
    return (
      <section class={[style.block, style.notice]}>
        <div class={[style.notice__inner]}>
          <p class={style.block__title_wrap}>
            <span class={style.block__title}>通知公告</span>
            <span
              class={style.block__more}
              onClick={() => {
                const { id } = (this as any).$route.query;
                (this as any).$router.push({
                  name: 'notice-list',
                  params: {
                    region: id,
                  },
                });
              }}
            >
              <span>查看更多</span>
              <img src={require('@/assets/images/region/more.png')} alt="" />
            </span>
          </p>
          <ul class={style.notice__list}>
            {notices.map((n) => (
              <li
                class={style.notice__item}
                onClick={() => {
                  this.redirectToDetail(n);
                }}
              >
                <p class={style.notice__item_name}>{n.title}</p>
                <p class={style.notice__item_time}>
                  发布时间：{n.publish_time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  renderHighlights() {
    const highlights = [
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
      {
        img: require('@/assets/images/region/news_1.png'),
        title:
          '信息学名师工作室开学第一课开讲——探索“强基”背景下的信息学人才培养通道',
        time: '2021年4月25',
      },
    ];
    return (
      <section class={[style.block, style.highlights]}>
        <p class={style.block__title_wrap}>
          <span class={style.block__title}>精彩瞬间</span>
        </p>
        <ul class={style.highlights__list}>
          <img
            class={[
              style.highlights__list_control,
              style.highlights__list_control_prev,
            ]}
            src={require('@/assets/images/region/prev.png')}
            alt=""
          />
          <img
            class={[
              style.highlights__list_control,
              style.highlights__list_control_next,
            ]}
            src={require('@/assets/images/region/next.png')}
            alt=""
          />
          <div class="swiper-wrapper">
            {highlights.map((n) => (
              <li class={[style.highlights__item, 'swiper-slide']}>
                <img class={style.highlights__item_img} src={n.img} alt="" />
                {/* <p class={style.highlights__item_name}>{n.title}</p>
          <p class={style.highlights__item_time}>发布时间：{n.time}</p> */}
              </li>
            ))}
          </div>
        </ul>
      </section>
    );
  }
  // renderFriendLink() {
  //   const links = [
  //     {
  //       title: '中国计算机协会',
  //       link: 'https://www.baidu.com',
  //     },
  //     {
  //       title: '信息学奥林匹克竞赛（NOI）',
  //       link: 'https://www.baidu.com',
  //     },
  //     {
  //       title: '国际信息学奥林匹克竞赛（IOI）',
  //       link: 'https://www.baidu.com',
  //     },
  //     {
  //       title: '北京市科学技术协会',
  //       link: 'https://www.baidu.com',
  //     },
  //     {
  //       title: '北京市教育创新研究院',
  //       link: 'https://www.baidu.com',
  //     },
  //   ];
  //   return (
  //     <section class={[style.block, style.friendLink]}>
  //       <p class={style.block__title_wrap}>
  //         <span class={style.block__title}>友情链接</span>
  //       </p>
  //       <ul class={style.friendLink__list}>
  //         {links.map((n) => (
  //           <li class={style.friendLink__item}>
  //             <a href={n.link}>
  //               <img src={require('@/assets/images/region/link.png')} alt="" />
  //               <span class={style.friendLink__item_name}>{n.title}</span>
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //     </section>
  //   );
  // }
  render() {
    return (
      <div class={style.region}>
        {this.renderMainImg()}
        {this.renderNews()}
        {this.renderNotice()}
        {this.renderHighlights()}
        {/* {this.renderFriendLink()} */}
        <FriendLink></FriendLink>
      </div>
    );
  }
}
