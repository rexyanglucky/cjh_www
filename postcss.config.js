module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      minPixelValue: 15,
    },
  },
};
