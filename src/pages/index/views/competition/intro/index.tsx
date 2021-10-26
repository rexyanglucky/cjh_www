import { Component, Vue } from 'vue-property-decorator';
import style from './index.module.scss';

@Component
export default class Preparation extends Vue {
  renderB1() {
    return (
      <section class={[style.block, style.b1]}>
        <p class={style.block__title}>活动主题</p>
        <div class={style.block__content}>
          <p>
            方向一：可持续城市。可从城市交通、绿色城市、社区生活、空气质量、环保能源、城市灾害处理等有利于城市可持续发展的领域内进行作品的制作与提交
          </p>
          <p>
            方向二：航空航天。2021年2月10日首次火星探测任务“天问一号”环绕火星成功，发展航天事业，建设航天强国，是中国不懈追求的航天梦，学生可围绕航天航空、月球基地、火星基地等方向进行作品主题的制作与提交。
          </p>
        </div>
      </section>
    );
  }
  renderB3() {
    return (
      <section class={[style.block, style.b3]}>
        <p class={style.block__title}>赛项内容</p>
        <div class={style.block__content}>
          <p>活动赛项共分为设计与工程、科学与技术、计算机科学三个赛项。</p>
          <h4 class={style.h4}>一、设计与工程 赛项介绍</h4>
          <p>
            设计与工程赛项分为设计组与工程组，其中设计组重点考核学生的创意思考、解决问题、动手操作、艺术审美、学习应用、语言表达等能力，学生需要利用设计思维工具及基础技能知识进行作品的设计与制作；工程组重点考核学生的数理逻辑、工程技术、动手操作、综合能力，学生利用开源软硬件、编程等技能知识进行作品原型搭建，最终通过展演赛或创客马拉松形式评选出具有创新精神、创新意识和实践能力的中小学生。
          </p>
          <h4>二、科学与技术 赛项介绍</h4>
          <p>
            科学与技术竞赛重点考核学生的学科基础、创新能力、探究潜力等科学精神，通过课题成果的形式评选出具有科学精神、学科基础扎实的杰出中学生科研人才。
            <br />
            赛项下设四个学科门类：数学与计算机科学、物理学与天文学、生命科学与化学、工程与发明，学生需提交项目研究报告或论文，并出具实验记录、原始数据、实物模型等演示材料。
          </p>
          <h4>三、计算机科学 赛项介绍</h4>
          <p>
            计算机科学赛项下设图形化编程、Python编程和C++编程三个组别，每个组别中设有普及组和提高组。图形化编程考察学生对图形化编程操作的理解和掌握程度，要求学生可独立完成编程项目。Python编程主要考察学生对Python语言和语法的掌握，实现Python程序语言设计。C++项目通过代码式编程，综合考察学生对计算机基础知识、编程概念及常见算法的理解、掌握情况。
          </p>
          <p class={style.warn}>
            2021创计划创客挑战赛市级选拔活动——计算机科学赛项仅开放图形化编程组别的考试，python编程和c++编程组别考试暂不开展。
          </p>
        </div>
      </section>
    );
  }
  render() {
    return (
      <div class={style.competition_intro}>
        {this.renderB1()}
        {this.renderB3()}
      </div>
    );
  }
}
