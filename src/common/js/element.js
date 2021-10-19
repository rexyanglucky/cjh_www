import '@/common/styles/element-variables.scss';
// import '@acznpm/com-el/lib/comEl.css';

import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';
import OptionGroup from 'element-ui/lib/option-group';

import Row from 'element-ui/lib/row';
import Col from 'element-ui/lib/col';
import Form from 'element-ui/lib/form';

import Tree from 'element-ui/lib/tree';
import FormItem from 'element-ui/lib/form-item';
import Timeline from 'element-ui/lib/timeline';
import TimelineItem from 'element-ui/lib/timeline-item';
import Tabs from 'element-ui/lib/tabs';
import TabPane from 'element-ui/lib/tab-pane';

import Progress from 'element-ui/lib/progress';
import Dialog from 'element-ui/lib/dialog';
import Button from 'element-ui/lib/button';
// import Card from 'element-ui/lib/card';
import Input from 'element-ui/lib/input';
import Image from 'element-ui/lib/image';
import Loading from 'element-ui/lib/loading';

import MessageBox from 'element-ui/lib/message-box';
import Message from 'element-ui/lib/message';

import InputNumber from 'element-ui/lib/input-number';
import Checkbox from 'element-ui/lib/checkbox';
// import CheckboxButton from 'element-ui/lib/checkbox-button';
import CheckboxGroup from 'element-ui/lib/checkbox-group';
import CarouselItem from 'element-ui/lib/carousel-item';
import Carousel from 'element-ui/lib/carousel';
import Table from 'element-ui/lib/table';
import TableColumn from 'element-ui/lib/table-column';
import DatePicker from 'element-ui/lib/date-picker';
import Radio from 'element-ui/lib/radio';
import RadioGroup from 'element-ui/lib/radio-group';
import Popover from 'element-ui/lib/popover';
import Cascader from 'element-ui/lib/cascader';
import ToolTip from 'element-ui/lib/tooltip';
import ColorPicker from 'element-ui/lib/color-picker';
import Link from 'element-ui/lib/link';
import Drawer from 'element-ui/lib/drawer';
import Upload from 'element-ui/lib/upload';
import DropDown from 'element-ui/lib/dropdown';
import DropDownItem from 'element-ui/lib/dropdown-item';
import DropDownMenu from 'element-ui/lib/dropdown-menu';
import BreadCrumb from 'element-ui/lib/breadcrumb';
import BreadCrumbItem from 'element-ui/lib/breadcrumb-item';
import CollapseItem from 'element-ui/lib/collapse-item';
import Collapse from 'element-ui/lib/collapse';
import InfiniteScroll from 'element-ui/lib/infinite-scroll';

import RadioButton from 'element-ui/lib/radio-button';
import Container from 'element-ui/lib/container';
import Header from 'element-ui/lib/header';
import Aside from 'element-ui/lib/aside';
import Main from 'element-ui/lib/main';
import Pagination from 'element-ui/lib/pagination';
// import Message from 'element-ui/lib/message';

export const elementInit = {
  init(Vue) {
    Vue.use(Progress);
    // Vue.use(Dialog);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(TabPane);
    Vue.use(Tabs);
    Dialog.props.lockScroll = {
      type: Boolean,
      required: false,
      default: false,
    };
    Vue.use(Dialog);
    Vue.use(Button);
    //     Vue.use(Card);
    Vue.use(Input);
    Vue.use(Image);
    Vue.use(InputNumber);
    Vue.use(Tree);
    //     Vue.use(InputNumber);
    Vue.use(Checkbox);
    //     Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Timeline);
    Vue.use(TimelineItem);
    Vue.use(Popover);
    Vue.use(Cascader);
    Vue.use(ToolTip);
    Vue.use(ColorPicker);
    Vue.use(Link);
    Vue.use(Drawer);
    Vue.use(Upload);
    Vue.use(DropDown);
    Vue.use(DropDownItem);
    Vue.use(DropDownMenu);
    Vue.use(BreadCrumb);
    Vue.use(BreadCrumbItem);
    Vue.use(CollapseItem);
    Vue.use(Collapse);
    Vue.use(InfiniteScroll);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    Vue.use(RadioButton);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Loading.directive);
    Vue.use(Pagination);
    Vue.prototype.$message = Message;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
  },
};
