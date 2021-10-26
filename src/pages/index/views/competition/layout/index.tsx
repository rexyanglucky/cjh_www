import { menu } from '@/pages/index/components/header';
import { Component, Vue, Watch } from 'vue-property-decorator';
import style from './index.module.scss';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';

@Component
export default class CompeitionLayout extends Vue {
  menus: Array<menu> = [
    {
      name: '赛事介绍',
      type: 'link',
      link: 'competition-intro',
    },
    {
      name: '赛事详情',
      type: 'link',
      link: 'competition-detail',
    },
    {
      name: '赛事报名',
      type: 'link',
      link: 'competition-reg',
    },
  ];

  // beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext<any>) {
  //   // const { meta } = to;
  //   // console.log(to);
  //   // if (meta) {
  //   //   this.query.type = meta.type;
  //   // }
  //   // next();
  // }

  renderBanner() {
    return <div class={style.banner}></div>;
  }
  renderTab() {
    return (
      <ul class={style.tabs}>
        {this.menus.map((m) => (
          <router-link
            custom
            to={{
              name: m.link,
              // params: (this as any).$route.params,
            }}
          >
            {({
              navigate,
              href,
              isExactActive,
            }: {
              href: string;
              route: Route;
              navigate: (e: any) => any;
              isActive: boolean;
              isExactActive: boolean;
            }) => {
              return (
                <li
                  class={[
                    style.tabs__item,
                    isExactActive ? style.tabs__item_active : '',
                  ]}
                  onClick={navigate}
                >
                  {m.name}
                </li>
              );
            }}
          </router-link>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div class={style.competition_layout}>
        {this.renderBanner()}
        <div class={style.content}>
          {this.renderTab()}
          {/* <keep-alive> */}
          <router-view />
          {/* </keep-alive> */}
        </div>
      </div>
    );
  }
}
