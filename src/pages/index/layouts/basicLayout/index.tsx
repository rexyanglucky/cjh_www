import { Vue, Component } from 'vue-property-decorator';
import Header from '@/pages/index/components/header';
import Footer from '@/pages/index/components/footer';
import { isMobileDevice } from '@/utils/index';
import './index.scss';

@Component({
  components: {
    'cjh-header': Header,
  },
})
export default class BasicLayout extends Vue {
  render() {
    return (
      <div>
        <cjh-header></cjh-header>
        <router-view></router-view>
        <Footer></Footer>
      </div>
    );
  }
}
