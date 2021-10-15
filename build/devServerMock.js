
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const API_PREFIX = '/api';

function getMockData(url) {
  let mockData;
  const pattern = `./src/pages/**/_mock.js`;
  const files = glob.sync(pattern);
  console.log('mock files', files.length);
  const tempUrl = url
    .replace(`GET ${API_PREFIX}`, '')
    .replace(`POST ${API_PREFIX}`, '');
  for (let k = 0; k < files.length; k++) {
    const entry = files[k];
    const cwd = process.cwd();
    const p = path.join(cwd, entry);
    const data = fs.readFileSync(p, { encoding: 'utf-8' });
    if (data.indexOf(tempUrl) > -1) {
      delete require.cache[p];
      const t = require(p);
      if (t[url]) {
        mockData = t;
        break;
      }
    }
  }
  return mockData;
}
module.exports = (app) => {
  app.use(API_PREFIX, (req, res, next) => {
    const url = `${req.method} ${req.baseUrl}${req.path}`;
    const mock = getMockData(url);
    const m = mock[url];
    if (m) {
      m(req, res);
    } else {
      next();
    }
  });
};
