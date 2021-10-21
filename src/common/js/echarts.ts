import * as echarts from 'echarts/core';

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  GaugeChart,
  GaugeSeriesOption,
  MapChart,
  LinesChart,
  ScatterChart,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  DataZoomComponent,
  DataZoomComponentOption,
  LegendComponent,
  LegendComponentOption,
  GeoComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DataZoomComponentOption
  | GaugeSeriesOption
  | LegendComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
  GeoComponent,
  BarChart,
  LineChart,
  GaugeChart,
  CanvasRenderer,
  MapChart,
  GeoComponent,
  LinesChart,
  ScatterChart,
  // SVGRenderer,
]);
export { echarts };
