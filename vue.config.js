/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const ThemeColorReplacer = require('webpack-theme-color-replacer');

const forElementUI = require('webpack-theme-color-replacer/forElementUI');
const gitSha = require('child_process')
  // .execSync('git rev-parse HEAD')
  .execSync('git log --pretty=format:"%h" -1')
  .toString()
  .trim();
const devServerProxy = require('./build/devServerProxy.js');
const multiPageConfig = require('./build/multiPageConfig.js');
const theme = require('./src/common/js/themeConfig.js');

const pagesObj = {};

process.env.VUE_APP_SERVERKEY = process.env.npm_package_config_serverkey;
if (process.env.NODE_ENV === 'development') {
  process.env.VUE_APP_SERVERKEY = process.env.DEV_ENV;
}

process.env.VUE_APP_AXX_LOG_GROUP = 'acz';
process.env.VUE_APP_GIT_SHA = gitSha;

// 页面模板使用
let domainDict = {
  icon: 'favicon.ico',
  seokeyword: '教学平台',
  seodescription: '咨询：400-898-0858',
  title: '首页',
  name: '教学平台',
  baiduTongji: 'https://hm.baidu.com/hm.js?aa98e309761bbbeac17f6711a0d2d3ad',
};

const multiObj = {
  init() {
    const isDev = process.env.NODE_ENV === 'development';
    const ignorePages = [
      // 忽略页面，如已下线
    ];
    let pattern = `./src/pages/!(${ignorePages.join('|')})/**/main.ts`;
    if (isDev) {
      pattern = process.env.PAGE_ENTRY_PATTERN || pattern;
    }
    this.genPageConfig(this.getPages(pattern));
  },
  /**
   * 根据入口文件配置多页对象
   * @param {*} pages
   */
  genPageConfig(pages) {
    // 指定某些页面不走公共模板
    const specialTemplateList = {};
    for (const key in pages) {
      const common = './public/index.html';
      pagesObj[key] = {
        entry: ['./src/common/js/entry.ts', `${pages[key]}`],
        template: common,
        filename: `${key}/index.html`,
        title: `${domainDict.name}-${
          this.pageConfig[key] && this.pageConfig[key].title
            ? this.pageConfig[key].title
            : domainDict.title
        }`,
        cdn: {
          js:
            this.pageConfig[key] && this.pageConfig[key].js
              ? this.pageConfig[key].js
              : [],
          css:
            this.pageConfig[key] && this.pageConfig[key].css
              ? this.pageConfig[key].css
              : [],
        },
        customObj: {
          isprod: process.env.npm_package_config_serverkey === 'prod',
          seokeyword:
            this.pageConfig[key] && this.pageConfig[key].seokeyword
              ? this.pageConfig[key].seokeyword
              : domainDict.seokeyword,
          seodescription:
            this.pageConfig[key] && this.pageConfig[key].seodescription
              ? this.pageConfig[key].seodescription
              : domainDict.seodescription,
          usePCMeta: this.pageConfig[key] && this.pageConfig[key].usePCMeta,
          useMathJax: this.pageConfig[key] && this.pageConfig[key].useMathJax,
          NODE_ENV: process.env.NODE_ENV,
          ...domainDict,
        },
        chunksSortMode: 'manual',
        chunks:
          this.pageConfig[key] && this.pageConfig[key].chunks
            ? [...this.pageConfig[key].chunks, key]
            : [...this.commonChunks, key],
      };
      if (Object.hasOwnProperty.call(specialTemplateList, key)) {
        pagesObj[key].template = specialTemplateList[key];
      }
    }
    if (pagesObj.index) {
      pagesObj.index.filename = 'index.html';
    }
  },
  /**
   * 获取所有入口文件
   * @param {*} globPath
   * @param {*} rootpath
   */
  getPages(globPath, rootpath) {
    rootpath = rootpath || './src/pages';
    const entries = {};
    console.time('global');
    glob.sync(globPath).forEach((entry) => {
      const dirname = path.dirname(entry);
      const relativePath = path.posix.relative(rootpath, dirname);
      entries[relativePath] = entry;
    });
    console.timeEnd('global');
    console.log('页面总数：', Object.keys(entries).length);
    return entries;
  },
  commonChunks: ['role-common', 'chunk-vendors', 'chunk-common'],
  pageConfig: multiPageConfig,
};
multiObj.init();
const config = {
  chainWebpack: (config) => {
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      if (config && config.optimization && config.optimization.minimizer) {
        const m = config.optimization.minimizer[0];
        // m.options.terserOptions.compress.drop_console = true;
        m.options.terserOptions.compress.drop_debugger = true;
        // m.options.terserOptions.compress.pure_funcs = ['console.log'];
      }
    }
    const res = {
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
        },
      },
      externals: {
        MathJaxAPI: 'MathJaxAPI',
      },
      module: {
        rules: [
          {
            resourceQuery: /blockType=link/,
            loader: require.resolve('./build/loader/extral-source-loader.js'),
          },
        ],
      },
      entry: {
        'role-common': './src/common/js/role.ts',
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            echarts: {
              name: 'chunk-echarts',
              test: /[\\/]node_modules[\\/]((echarts)|(zrender))[\\/]/,
              chunks: 'all',
            },
            // vendors: {
            //   minChunks: 3,
            // },
            common: {
              minChunks: 5,
            },
          },
        },
      },
      plugins: [
        // 将theme-changed.scss应用到element-ui，供babel-plugin-component按需加载
        //   new JoinFileContentPlugin({
        //     file: 'node_modules/element-theme-chalk/src/common/var.scss',
        //     prependFile: 'src/css/element-theme/theme-changed.scss'
        // }),
        //生成仅包含颜色的替换样式（主题色等）
        new ThemeColorReplacer({
          fileName: 'css/theme-colors.[contenthash:8].css',
          matchColors: [...theme.DefaultTheme],
          changeSelector: forElementUI.changeSelector,
          isJsUgly: process.env.NODE_ENV === 'production',
          // changeUrl: '/css/theme-colors.[contenthash:8].css'
          // injectCss: false,
          // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
          //     return resultCss + youCssCode
          // }
        }),
      ],
    };
    return res;
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/common/styles/param.scss";`,
      },
    },
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  pages: pagesObj,
  devServer: {
    disableHostCheck: true,
    proxy: devServerProxy,
    // port: 8081,
    historyApiFallback: {
      rewrites: [
        {
          from: /(index)\/.+/gi,
          to: '/index',
        },
        // {
        //   from: /(^.+)\/.+/gi,
        //   to: req => {
        //     let url = '/';
        //     req.parsedUrl.path.replace(/(^.+)\/.+/gi, function(all, match0) {
        //       url = match0;
        //     });
        //     return url;
        //   },
        // },
      ],
    },
  },
  productionSourceMap: true,
  publicPath: '/gk/',
  outputDir: process.env.NODE_ENV === 'production' ? 'dist/gk' : 'dist',
};
// 开发时设置mock
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  const devServerMock = require('./build/devServerMock.js');
  config.devServer.before = devServerMock;
}
module.exports = config;
