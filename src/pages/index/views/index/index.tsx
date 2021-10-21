import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';
import p2Img from '@/assets/images/index/p2.png';
import f3_1 from '@/assets/images/index/f3_1.png';
import f3_2 from '@/assets/images/index/f3_2.png';
import ChinaMap from '../../components/china-map';
import RegComptition from '../../components/reg-comptiton';
// import p3Img from '@/assets/images/index/p3.png';
@Component
export default class Preparation extends Vue {
  renderFloor1() {
    return (
      <section class={[style.floor, style.f1]}>
        <div class={style.f1__img}>
          <img src="" alt="" />
        </div>
        <section class={style.f1__content}>
          <section>
            <p class={style.tips}># &nbsp;寻找下一个城市伙伴</p>
            <p class={style.tips_name}>挑战自我 创造未来</p>
            <el-button type="primary" class={style.btn_reg}>
              参加比赛
            </el-button>
          </section>
        </section>
      </section>
    );
  }
  renderFloor2() {
    return (
      <section class={[style.floor, style.f2]}>
        <div class={style.f2__content}>
          <p class={style.f2__tips}>什么是“创计划”</p>
          <p class={style.f2__title}>创新人才培养，打造中学创客成才新通道</p>
          <p class={style.f2__text}>
            <p>
              清华大学在创新创业教育融入人才培养体系、技术创新创业辅修专业建设、各类创新创业教育平台构建、引领创新创业教育发展方向等方面取得了重大进展及成绩。同时，为响应“大众创业、万众创新”的号召，清华大学开放资源，积极与各高校、中小学教育单位合作，将创新创业人才培养环节提前。
            </p>
            <p>
              清华大学通过“创计划”创客挑战赛，选拔一批具有创新精神和实践能力的中学生创客，打造中学创客成才新通道，加强对创新创业基础教育的引领作用，树立创新创业教育模式新典范，在全国范围内发挥示范作用。
            </p>
          </p>
        </div>
        <div class={style.f2__rich}>
          <div class={style.f2__rich_bg}>
            <div class={style.f2__rich_bg_mask}></div>
            {/* <img class={style.f2__rich_bg} src={p3Img} alt="img" /> */}
          </div>
          <img class={style.f2__rich_content} src={p2Img} alt="img" />
        </div>
      </section>
    );
  }
  renderFloor3() {
    return (
      <section class={[style.floor, style.f3]}>
        <p class={style.f3__tips}>项目理念</p>
        <p class={style.f3__name}>“播撒创客种子，传播创客精神”</p>
        <div class={style.f3__content}>
          <div class={style.f3__content_card}>
            {/* <img src={f3_1} alt="" /> */}
            <img class={style.card__img} v-lazy={f3_1} alt="" />
            <p class={style.card__name}>学科交叉的整合思维</p>
          </div>
          <div class={style.f3__content_card}>
            {/* <img v-lazy={f3_2} src={f3_2} alt="" /> */}
            <img class={style.card__img} v-lazy={f3_2} alt="" />
            <p class={style.card__name}>学科交叉的整合思维</p>
          </div>
        </div>
      </section>
    );
  }
  renderFloor4() {
    const nums = [
      {
        value: 60989,
        label: '全国累计参赛人数',
        unit: '人',
      },
      {
        value: 895,
        label: '比赛覆盖省市',
        unit: '座',
      },
      {
        value: 6802,
        label: '获奖人数',
        unit: '人',
      },
      {
        value: 30989,
        label: '优秀作品数量',
        unit: '件',
      },
    ];
    return (
      <section class={[style.floor, style.f4]}>
        <div class={style.f4__title_wrap}>
          <div>
            <p class={style.f4__tips}>活动概况</p>
            <p class={style.f4__name}>“播撒创客种子，传播创客精神”</p>
          </div>
        </div>
        <div class={style.f4__data}>
          <ul class={style.f4__data_list}>
            {nums.map((item) => {
              return (
                <li class={style.f4__data_item}>
                  <p>
                    <span class={style.item_value}>{item.value}</span>
                    <span class={style.item_unit}>{item.unit}</span>
                  </p>
                  <p class={style.item_label}>{item.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
  renderFloor5() {
    const teachers = [
      {
        img: require('@/assets/images/index/t_fzy.png'),
        name: '付志勇',
        jobs: [
          '清华大学艺术与科技创新 (ATI) 基地主任',
          '清华大学美术学院信息艺术设计系副教授',
        ],
      },
      {
        img: require('@/assets/images/index/t_wsz.png'),
        name: '王尚致',
        jobs: ['首都师范大学教授', '教育部《高中数学课程标准》研制组副组长'],
      },
      {
        img: require('@/assets/images/index/t_ldy.png'),
        name: '李大永',
        jobs: ['北京市海淀区教师、进修学校数学教研员'],
      },
    ];
    return (
      <section class={[style.floor, style.f5]}>
        <p class={style.f5__tips}>专家评委阵容</p>
        <p class={style.f5__name}>专家教授评委团队</p>
        <p class={style.f5__desc}>
          活动重点考核学生的创造力、学习能力、动手能力等综合能力，通过创客马拉松的形式评选出具有创客精神、创新意识和实践能力的杰出中学生创客。
        </p>
        <div class={style.f5__content}>
          <ul class={style.f5__teachers}>
            {teachers.map((item) => {
              return (
                <li class={style.teacher_item}>
                  <img
                    class={style.teacher_item__img}
                    v-lazy={item.img}
                    alt=""
                  />
                  <p class={style.teacher_item__name}>{item.name}</p>
                  {item.jobs.map((j) => (
                    <p class={style.teacher_item__job}>{j}</p>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
  renderFloor6() {
    const partners = [
      {
        img: require('@/assets/images/index/partner_1.png'),
      },
      {
        img: require('@/assets/images/index/partner_2.png'),
      },
      {
        img: require('@/assets/images/index/partner_3.png'),
      },
      {
        img: require('@/assets/images/index/partner_4.png'),
      },
    ];
    return (
      <section class={[style.floor, style.f6]}>
        <p class={style.f6__name}>合作伙伴</p>
        <div class={style.f6__content}>
          <ul class={style.partners}>
            {partners.map((p) => (
              <li class={style.partner_item}>
                <img class={style.partner_item__img} v-lazy={p.img} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  renderFloor7() {
    return (
      <section class={[style.floor, style.f7]}>
        <div class={style.f7__bg}></div>
        <div class={style.f7__content}>
          <p class={style.f7__name}>活动形式</p>
          <p class={style.f7__text}>
            活动重点考核学生的创造力、学习能力、动手能力等综合能力，通过创客马拉松的形式评选出具有创客精神、创新意识和实践能力的杰出中学生创客。每场挑战赛都会规定不同主题，参赛学生在24小时内完成规定主题的设计制作任务，同时在制作中融入开放设计思维的学习理念，每组选手可以对自己的作品进行需求定义，借助提供的创客开发工具、元件和设备，以项目制的学习方法完成团队协作，将创意变成产品，并进行最终的项目路演。考核专家依据学生在24小时全过程钟的表现以及最终的作品展示进行评分。比赛现场无网络，比赛期间禁止使用手机，现场所有可以获得的信息资料仅来源于参赛学生平日知识积累。
          </p>
        </div>
      </section>
    );
  }
  renderFloor8() {
    const actives = [
      {
        desc: '运用开源硬件模块，进行创意设计',
        img: require('@/assets/images/index/f8_1.png'),
      },
      {
        desc: '使用机械结构件等材料，对自己的作品进行设计、装饰，需要配合自己的作品，突出主题',
        img: require('@/assets/images/index/f8_1.png'),
      },
      {
        desc: '作品分享展示，为自己的作品设计宣传海报、答辩报告，并进行展演',
        img: require('@/assets/images/index/f8_1.png'),
      },
    ];
    return (
      <section class={[style.floor, style.f8]}>
        <div class={style.f8__content}>
          <ul class={style.actives}>
            {actives.map((item, index) => (
              <li class={style.active__item}>
                <span class={style.active_seq}>{index + 1}</span>
                <span class={style.active_desc}>{item.desc}</span>
              </li>
            ))}
          </ul>
          <div class={style.active_img__wrap}>
            {actives.map((item, index) => (
              <img src={item.img} class={style.active_img} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  renderFloor9() {
    return (
      <section class={[style.floor, style.f9]}>
        <div class={style.f9__img}>
          {/* <img
            class={style.f9__img_1}
            v-lazy={require('@/assets/images/index/f9_1.png')}
            alt=""
          />*/}
          <img
            class={style.f9__img_2}
            v-lazy={require('@/assets/images/index/f9_2.png')}
            alt=""
          />
          <ChinaMap></ChinaMap>
        </div>
        <div class={style.f9__content}>
          <RegComptition></RegComptition>
        </div>
      </section>
    );
  }
  render() {
    return (
      <div class={style.index}>
        {this.renderFloor1()}
        {this.renderFloor2()}
        {this.renderFloor3()}
        {this.renderFloor4()}
        {this.renderFloor5()}
        {this.renderFloor6()}
        {this.renderFloor7()}
        {this.renderFloor8()}
        {this.renderFloor9()}
      </div>
    );
  }
}
