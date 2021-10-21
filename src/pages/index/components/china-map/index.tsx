import { echarts, ECOption } from '@/common/js/echarts';
import VueEcharts from '@/components/vue-echarts';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { chinaMap, chinaMapOutline, option as mapOption } from './constant';
import style from './index.module.scss';
const MaxLines = 7;
@Component({
  components: {
    'vue-echarts': VueEcharts,
  },
})
export default class ChinaMap extends Vue {
  options: ECOption = {};
  chartInstance!: echarts.ECharts;
  $refs!: { kWrap: HTMLElement };
  created() {
    echarts.registerMap('chinaMap', chinaMap as any);
    echarts.registerMap('chinaMapOutline', chinaMapOutline as any);
  }
  mounted() {
    this.initOptions();
  }

  initOptions() {
    this.options = mapOption as ECOption;
  }
  render() {
    return (
      <div ref="kWrap" class={style.china_wrap}>
        <vue-echarts
          ref="chartCom"
          props={{
            options: this.options,
            height: '720px',
          }}
          on-chartInstanceReady={(chart: echarts.ECharts) => {
            this.chartInstance = chart;
          }}
        ></vue-echarts>
      </div>
    );
  }
}
