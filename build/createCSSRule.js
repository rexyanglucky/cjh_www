const path = require('path');

module.exports = function createCSSRule(config, lang, test) {
  const cssPublicPath = '/';
  const baseRule = config.module.rule(lang).test(test);

  // rules for <style lang="module">
  const vueModulesRule = baseRule.oneOf('vue-modules').resourceQuery(/module/);
  applyLoaders(vueModulesRule, true);

  // rules for <style>
  const vueNormalRule = baseRule.oneOf('vue').resourceQuery(/\?vue/);
  applyLoaders(vueNormalRule, false);

  // rules for *.module.* files
  const extModulesRule = baseRule
    .oneOf('normal-modules')
    .test(/\.module\.\w+$/);
  applyLoaders(extModulesRule, true);

  // rules for normal CSS imports
  const normalRule = baseRule.oneOf('normal');
  applyLoaders(normalRule);

  function applyLoaders(rule) {
    const shadowMode = !!process.env.VUE_CLI_CSS_SHADOW_MODE;
    const isProd = process.env.NODE_ENV === 'production';
    const extract = isProd;
    const shouldExtract = extract !== false && !shadowMode;
    if (shouldExtract) {
      rule.use('extract-css-loader').options({
        // publicPath: cssPublicPath,
        publicPath: (resourcePath, context) => {
          // console.log(context);
          // console.log(resourcePath);
          return path.relative(path.dirname(resourcePath), context) + '/';
        },
      });
    }
  }
};
