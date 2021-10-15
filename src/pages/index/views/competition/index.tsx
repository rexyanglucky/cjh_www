import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';

@Component
export default class Preparation extends Vue {
  render() {
    return <div class={style.demo}>demo</div>;
  }
}
