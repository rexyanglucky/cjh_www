import { Component, Vue } from 'vue-property-decorator';

import style from './index.module.scss';

import logo from '@/assets/logo.png';

interface menu {
  name: string;
  type: 'link' | 'dropdown';
  link?: string;
  subs?: Array<{ name: string; id: number }>;
  fn?: (menu: menu) => void;
  selectedSub?: any;
  showSubs?: boolean;
}
@Component
export default class Header extends Vue {
  menus: Array<menu> = [
    {
      name: '首页',
      type: 'link',
      link: '/index',
    },
    {
      name: '区域',
      type: 'dropdown',
      selectedSub: null,
      showSubs: false,
      link: '/region',
      fn: (item: menu) => {
        item.showSubs = true;
      },
      subs: [
        {
          name: '北京',
          id: 1,
        },
        {
          name: '天津',
          id: 2,
        },
        {
          name: '西安',
          id: 3,
        },
        {
          name: '大同',
          id: 4,
        },
        {
          name: '洛阳',
          id: 5,
        },
      ],
    },
    {
      name: '参赛报名',
      type: 'link',
      link: '/competition',
    },
    {
      name: '公益课堂',
      type: 'link',
      link: '/',
    },
    {
      name: '历程回顾',
      type: 'link',
      link: '/history',
    },
    {
      name: '作品赏析',
      type: 'link',
      link: '/works',
    },
  ];
  // curMenu: menu = this.menus[0];

  created() {
    this.menus.forEach((item) => {
      if (this.$route.path === item.link) {
        const { id } = this.$route.query;
        if (id) {
          const selectedSub = (item.subs || []).find((s) => s.id === +id);
          if (selectedSub) {
            item.selectedSub = selectedSub;
          }
        }
      }
    });
  }

  renderRegion(regions: Array<{ name: string; id: number }>, menu: any) {
    // return <div class={[style.region, menu.showSubs ? style.show : '']}>
    return (
      <div class={[style.region]}>
        <div class={style.region__inner}>
          <ul class={style.region__list}>
            {regions.map((item) => (
              <li
                class={[
                  style.region__list_item,
                  menu.selectedSub === item
                    ? style.region__list_item_active
                    : '',
                ]}
                onClick={() => {
                  menu.selectedSub = item;
                  // this.curMenu = menu;
                  this.$router.push({
                    name: 'region',
                    query: {
                      id: item.id,
                    },
                  });
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <section class={style.region__content}>
            <section>
              <p class={style.tips}># &nbsp;寻找下一个城市伙伴</p>
              <p class={style.tips_name}>点亮创新之星</p>
              <el-button type="primary" class={style.btn_reg}>
                参加比赛
              </el-button>
            </section>
          </section>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.$route);
    return (
      <div class={style.header}>
        <div class={[style.header_content, 'main-content-wrap']}>
          <div class={style.logo}>
            <img src={logo} alt="创计划" title="创计划" />
          </div>
          <ul class={style.nav}>
            {this.menus.map((item) => {
              if (item.type === 'link') {
                return (
                  <router-link
                    to={{ path: item.link }}
                    tag="li"
                    class={style.nav_item}
                    exact
                    active-class={style.nav_item_active}
                  >
                    <span class={style.nav_item__content}>{item.name}</span>
                  </router-link>
                );
              } else {
                return (
                  <li
                    class={[
                      style.nav_item,
                      this.$route.path === item.link
                        ? style.nav_item_active
                        : '',
                    ]}
                  >
                    <div class={style.nav_item__content}>
                      <span
                        onClick={() => {
                          item.fn && item.fn(item);
                        }}
                      >
                        {(item as any).selectedSub
                          ? (item as any).selectedSub.name
                          : item.name}
                      </span>
                      <svg-icon
                        class={style.nav_item_icon_slide}
                        name="up"
                        dir="down"
                      ></svg-icon>
                    </div>
                    {item.subs && this.renderRegion(item.subs, item)}
                  </li>
                );
              }
            })}
          </ul>
          <div class={style.op}>
            <el-button class={style.btn_login} type="plain">
              登录
            </el-button>
          </div>
        </div>
      </div>
    );
  }
}
