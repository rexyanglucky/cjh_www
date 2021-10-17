import style from './index.module.scss';

const Footer = () => {
  return (
    <section class={style.footer}>
      <div class={[style.footer__content, 'main-content-wrap']}>
        <ul class={style.info__list}>
          <li class={[style.info__item, style.logo]}>
            <img
              class={style.info__item_logo}
              src={require('@/assets/images/index/footer_logo.png')}
              alt=""
            />
            <p class={style.info__item_phone}>
              <img
                src={require('@/assets/images/index/footer_mobile.png')}
                alt=""
              />
              <span>185-1971-8252</span>
            </p>
          </li>
          <li class={[style.info__item, style.contact]}>
            <p class={style.info__item_title}>联系方式</p>
            <p class={style.info__item_text}>
              <img
                src={require('@/assets/images/index/footer_email.png')}
                alt=""
              />
              <span>chuangjihua2020@163.com</span>
            </p>
            <p class={style.info__item_text}>
              <img
                src={require('@/assets/images/index/footer_location.png')}
                alt=""
              />
              <span>北京市海淀区中关村东路18号财智国际大厦C座2008 </span>
            </p>
          </li>
          <li class={[style.info__item, style.link]}>
            <p class={style.info__item_title}>友情链接</p>
            {[
              '清华大学',
              '中国高校创新创业教育联盟',
              '清华大学美术学院服务设计研究所',
              '清华大学艺术与科技创新基地',
            ].map((s) => (
              <p class={style.info__item_text}>
                <span>{s}</span>
              </p>
            ))}
          </li>
          <li class={[style.info__item, style.gzh]}>
            <p class={style.info__item_title}>创计划公众号</p>
            <img
              class={style.footer_logo}
              src={require('@/assets/images/index/footer_qrcode.png')}
              alt=""
            />
          </li>
        </ul>
        <div class={style.beian}>
          <span>北京青橙创客教育科技有限公司 版权所有</span>
          <span>京ICP备15056906号-3</span>
        </div>
      </div>
    </section>
  );
};
export default Footer;
