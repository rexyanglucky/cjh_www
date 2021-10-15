#!/usr/bin/env node
/* eslint-disable global-require */

const inquirer = require('inquirer');
const fs = require('fs');
const fx = require('mkdir-recursive');
const path = require('path');

const TARGET_DIR = `${process.cwd()}/src/pages`;
const ROLE_PATH = `${process.cwd()}/src/common/js/rolePage.ts`;
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const ROLECHOICES = [
  {
    key: 0,
    name: 'accesswhite 0 白名单,(访客，登录用户)都可访问',
    value: 0,
  },
  {
    key: 1,
    name: 'all 1 所有登录角色可访问',
    value: 1,
  },
  {
    key: 2,
    name: 'student 2 学生角色',
    value: 2,
  },
  {
    key: 3,
    name: 'teacher 3 教师角色',
    value: 3,
  },
  {
    key: -1,
    name: 'none -1 都不选 同 accesswhite,不会添加到role.js',
    value: -1,
  },
];

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      // eslint-disable-next-line no-useless-escape
      if (/^([A-Za-z\-\_\d\/\\])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];
const roleQuestion = [
  {
    name: 'role-choice',
    type: 'list',
    message: 'What the role of your new page',
    choices: ROLECHOICES,
  },
];
let projectName;
inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers['project-choice'];
  projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  fx.mkdirSync(`${TARGET_DIR}/${projectName}`);
  createDirectoryContents(templatePath, projectName);
  if (projectChoice !== 'new-page_spa.vue') {
    inquirer.prompt(roleQuestion).then((ranswers) => {
      const roleChoice = ranswers['role-choice'];
      createRole(roleChoice, projectName);
    });
  }
});

function createDirectoryContents(templatePath, newProjectPath) {
  let filesToCreate = [];
  if (fs.statSync(templatePath).isFile()) {
    // const file = path.basename(templatePath);
    filesToCreate.push(templatePath);
  } else {
    // filesToCreate = fs.readdirSync(templatePath);
    filesToCreate = fs.readdirSync(templatePath).map((item) => {
      return `${templatePath}/${item}`;
    });
  }
  console.log(filesToCreate);
  filesToCreate.forEach((item) => {
    const origFilePath = item;
    const file = path.basename(item);
    // const origFilePath = `${templatePath}/${file}`;
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      // replace router base
      if (origFilePath.indexOf('/router/index.ts') > -1) {
        contents = contents.replace(
          '// ${base placeholder} 不可删除,生成模版占位符',
          `base: process.env.BASE_URL + '${projectName}',`
        );
      }
      const writePath = `${TARGET_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fx.mkdirSync(`${TARGET_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}
function createRole(role, projectPath) {
  if (role === -1) {
    return;
  }
  const realContent = `  '/${projectPath}': [${role}],`;
  const str = fs.readFileSync(ROLE_PATH, 'utf8');
  // eslint-disable-next-line no-template-curly-in-string
  const placeholder = '  // ${page placeholder} 不可删除,生成模版占位符';
  const realStr = str.replace(placeholder, `${realContent}\r\n${placeholder}`);
  fs.writeFileSync(ROLE_PATH, realStr, 'utf8');
}
function createRouter() {}
