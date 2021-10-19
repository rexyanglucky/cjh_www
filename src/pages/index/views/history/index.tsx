import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';

@Component
export default class History extends Vue {
  renderBanner() {
    const years = [2020, 2019, 2018, 2017];

    return (
      <div class={style.banner}>
        <div class={style.banner__inner}></div>
        <p class={style.banner__content}>历程回顾</p>
        <div class={style.banner__timeline}>
          <ul>
            {years.map((y, index) => (
              <li
                class={[
                  style.banner__timeline_item,
                  index === 0 ? style.high : style.low,
                ]}
              >
                {y}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  renderList() {
    const histories = [
      {
        title: '1月',
        img: require('@/assets/images/history/c1.png'),
        content:
          '清华大学首次采用创客马拉松的形式，面向从全国 遴选出的50余名优秀高中生开展首期“创计划”创客 挑战赛。',
      },
      {
        title: '7月',
        img: require('@/assets/images/history/c1.png'),
        content:
          '清华大学首次采用创客马拉松的形式，面向从全国 遴选出的50余名优秀高中生开展首期“创计划”创客 挑战赛。',
      },
      {
        title: '10月',
        img: require('@/assets/images/history/c1.png'),
        content:
          '清华大学首次采用创客马拉松的形式，面向从全国 遴选出的50余名优秀高中生开展首期“创计划”创客 挑战赛。',
      },
      {
        title: '11月',
        img: require('@/assets/images/history/c1.png'),
        content:
          '清华大学首次采用创客马拉松的形式，面向从全国 遴选出的50余名优秀高中生开展首期“创计划”创客 挑战赛。',
      },
    ];
    return (
      <div class={style.history__list}>
        <ul>
          {histories.map((item) => {
            return (
              <li class={style.history__item}>
                <p class={style.history__item_title}>{item.title}</p>
                <img class={style.history__item_img} src={item.img}></img>
                <p class={style.history__item_content}>{item.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  render() {
    return (
      <div class={style.history}>
        {this.renderBanner()}
        {this.renderList()}
      </div>
    );
  }
}
