import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SearchTable, { SearchTableProps } from '@/components/Table/SearchTable';
import style from './index.module.scss';
import { StudentVo } from '../../student/interface';
import { getStudentsByClass } from '../services';
import { TableColumn } from 'element-ui/types/table-column';

@Component({
  components: {
    'search-table': SearchTable,
  },
})
export default class ClassStudentList extends Vue {
  selectionItems: StudentVo[] = [];
  $refs!: {
    searchTable: SearchTable<StudentVo>;
  };
  searchTableProps: SearchTableProps<StudentVo> = {
    searchFormProps: { formItems: [] },
    listProps: {
      apiMethod: getStudentsByClass,
      autoLoad: true,
      tableAttributes: {
        stripe: true,
      },
      // renderTotal: this.renderTotal,
    },
  };

  initFormItems() {
    const { id: classId } = this.$route.params;
    this.searchTableProps.searchFormProps = {
      ...this.searchTableProps.searchFormProps,
      formItems: [
        {
          label: '',
          prop: 'studentName',
          type: 'input',
          placeholder: '请输入学生姓名',
        },
      ],
      convertFormData: (formData: any) => {
        return { classId: classId, studentName: formData.studentName };
      },
      elFormProps: {
        inline: true,
      },
    };
  }
  initListPorps() {
    const { changeClass } = this;
    this.searchTableProps.listProps = {
      ...this.searchTableProps.listProps,
      columns: [
        {
          prop: 'id',
          label: '学生ID',
        },
        {
          prop: 'studentNum',
          label: '学号',
        },
        {
          prop: 'studentName',
          label: '学生姓名',
        },
        {
          prop: 'mobile',
          label: '联系方式',
        },
        {
          prop: 'parentMobile',
          label: '家长手机号',
        },
        {
          prop: 'address',
          label: '家庭住址',
        },
        {
          prop: '',
          label: '操作',
          formatter: (row: StudentVo, column: TableColumn) => {
            return (
              <div>
                <span
                  class={style.btn_op}
                  onClick={() => {
                    changeClass(row);
                  }}
                >
                  调班
                </span>
              </div>
            );
          },
        },
      ],
    };
  }
  changeClass(item: StudentVo) {
    console.log(item);
  }
  async created() {
    this.initFormItems();
    this.initListPorps();
  }
  render() {
    const { searchTableProps } = this;
    if (
      searchTableProps.listProps &&
      searchTableProps.listProps.columns &&
      searchTableProps.listProps.columns.length > 0
    ) {
      return (
        <search-table
          ref="searchTable"
          props={{ ...searchTableProps }}
        ></search-table>
      );
    }
  }
}
