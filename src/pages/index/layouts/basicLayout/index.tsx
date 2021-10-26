import { Vue, Component } from 'vue-property-decorator';
import Header from '@/pages/index/components/header';
import Footer from '@/pages/index/components/footer';
import { isMobileDevice } from '@/utils/index';
import './index.scss';
import { NavigationGuardNext, Route } from 'vue-router';

@Component({
  components: {
    'cjh-header': Header,
  },
})
export default class BasicLayout extends Vue {
  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext<any>) {
    next();
  }
  render() {
    return (
      <div>
        <cjh-header></cjh-header>
        {/* <keep-alive> */}
        <router-view></router-view>
        {/* </keep-alive> */}
        <Footer></Footer>
      </div>
    );
  }
}
