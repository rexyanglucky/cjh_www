/**
 * 角色列表
 * author yangjin0
 * 说明
    0 'accesswhite 白名单,(访客，登录用户)都可访问',
    1 'all 所有登录角色可访问',
    2 'student 学生角色',
    3 'teacher 教师角色',
    -1 'none 都不选 同 accesswhite,不会添加到role.js',
 *
 */
export declare enum RoleEnum {
  /** JSDoc */
  accessWhite = 0,
  /** JSDoc */
  common = 1,
  /** JSDoc */
  student = 1,
  /** JSDoc */
  teacher = 2,
}
export interface _rolePage {
  [k: string]: Array<RoleEnum>;
}

export const rolePage: _rolePage = {
  '/index': [0],
  '/index/views/course/study/components/Notice-dialog': [1],
  '/index/views/course/study/components/eventbus': [1],
  // ${page placeholder} 不可删除,生成模版占位符
};

export const Role = {
  accessWhite: 0,
  common: 1,
  student: 2,
  teacher: 3,
};
