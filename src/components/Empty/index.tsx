import style from './index.module.scss';
export default (attr: any) => {
  const {
    props: { desc, image },
  } = attr;
  return <div class={style.empty}>暂无数据</div>;
};
