module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_global.scss"; @import "@/styles/_reset.scss";`
      }
    }
  }
};

