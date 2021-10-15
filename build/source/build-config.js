// 动态写入域名
// 通过调用命令 npm config set acz-user:serverkey server161 && npm run build ,给不同的环境生成最终的login地址
const fs = require('fs');
const path = require('path');
const serverConfig = require('./config.obj');

const serverkey = process.env.npm_package_config_serverkey || 'prod';

// 根据serverKey 生成配置
console.log('------generate config.obj start------');
serverConfig.setServerConfig(serverkey);
const configStr = `const configObj = ${JSON.stringify(serverConfig)}`;

console.log(serverConfig);
console.log('------generate config.obj end------');
const opts = {
  cwd: __dirname,
  encoding: 'utf8',
  stdio: [process.stdin, process.stdout, process.stderr],
};

const fileName = path.resolve(__dirname, '../../src/config/config.export.ts');
console.log('------generate config/urls start------');
console.log('serverkey', serverkey);
fs.writeFileSync(
  fileName,
  `${configStr}\n\nexport default configObj.${serverkey};\n\n`,
  opts
);
console.log('------generate config/urls end------');
