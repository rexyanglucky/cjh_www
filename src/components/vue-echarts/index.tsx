import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import '@/common/js/echarts';
import { ECOption, echarts } from '@/common/js/echarts';
// import echarts from '@/common/js/echarts';
import style from './index.module.scss';
import { throttle } from 'lodash-es';

@Component
export default class VueEcharts extends Vue {
  @Prop({ type: Object, required: false }) options?: ECOption;
  @Prop({ type: String, required: false, default: '300px' }) height?: string;
  chart!: echarts.ECharts;
  $refs!: {
    chart: HTMLElement;
  };
  mounted() {
    // this.chart = echarts.init(this.$refs.chart, undefined, {
    //   renderer: 'svg',
    // });
    this.chart = echarts.init(this.$refs.chart);
    window.addEventListener(
      'resize',
      throttle(() => {
        this.chart.resize();
      }, 500)
    );
    this.$emit('chartInstanceReady', this.chart);
  }
  @Watch('options', { immediate: true })
  wathcOptions() {
    this.renderChart();
  }
  renderChart() {
    if (this.options && this.chart) {
      this.chart.setOption(this.options);
    }
  }
  render() {
    return <div style={`height: ${this.height}`} ref="chart"></div>;
  }
}
