import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';

@Component
export default class NotFound extends Vue {
  render() {
    return <div class={style.demo}>404</div>;
  }
}
