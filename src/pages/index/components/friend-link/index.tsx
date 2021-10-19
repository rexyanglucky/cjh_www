import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';

@Component
export default class FriendLink extends Vue {
  render() {
    const links = [
      {
        title: '中国计算机协会',
        link: 'https://www.baidu.com',
      },
      {
        title: '信息学奥林匹克竞赛（NOI）',
        link: 'https://www.baidu.com',
      },
      {
        title: '国际信息学奥林匹克竞赛（IOI）',
        link: 'https://www.baidu.com',
      },
      {
        title: '北京市科学技术协会',
        link: 'https://www.baidu.com',
      },
      {
        title: '北京市教育创新研究院',
        link: 'https://www.baidu.com',
      },
    ];
    return (
      <section class={[style.block, style.friendLink]}>
        <p class={style.block__title_wrap}>
          <span class={style.block__title}>友情链接</span>
        </p>
        <ul class={style.friendLink__list}>
          {links.map((n) => (
            <li class={style.friendLink__item}>
              <a href={n.link}>
                <img src={require('@/assets/images/region/link.png')} alt="" />
                <span class={style.friendLink__item_name}>{n.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
