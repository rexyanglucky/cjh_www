import { Component, Vue } from 'vue-property-decorator';

import style from './index.module.scss';

@Component
export default class RegComptition extends Vue {
  renderRegion() {
    // return <div class={[style.region, menu.showSubs ? style.show : '']}>
    return (
      <section class={style.region__content}>
        <section>
          <p class={style.tips}># &nbsp;寻找下一个城市伙伴</p>
          <p class={style.tips_name}>点亮创新之星</p>
          <el-button type="primary" class={style.btn_reg}>
            参加比赛
          </el-button>
        </section>
      </section>
    );
  }

  render() {
    return this.renderRegion();
  }
}
