// eslint-disable-next-line @typescript-eslint/no-var-requires
const forElementUI = require('webpack-theme-color-replacer/forElementUI');

// $blue-1: #f0fdff;
// $blue-2: #c9f7ff;
// $blue-3: #a1eeff;
// $blue-4: #78e2ff;
// $blue-5: #4fd3ff;
// $blue-6: $--color-primary;
// // $blue-7: #169bd9;
// $blue-7: #1890ff;
// $blue-8: #0977b3;
// $blue-9: #00568c;
// $blue-10: #003c66;
module.exports = {
  DefaultTheme: [
    ...forElementUI.getElementUISeries('#26c3ff'),
    '#f0fdff',
    '#c9f7ff',
    '#a1eeff',
    '#78e2ff',
    '#4fd3ff',
    '#26c3ff',
    '#1890ff',
    '#0977b3',
    '#00568c',
    '#003c66',
  ],
  GreenTheme: [
    ...forElementUI.getElementUISeries('#52c41a'),
    '#f6ffed',
    '#d9f7be',
    '#b7eb8f',
    '#95de64',
    '#73d13d',
    '#52c41a',
    '#389e0d',
    '#237804',
    '#135200',
    '#092b00',
  ],
};
