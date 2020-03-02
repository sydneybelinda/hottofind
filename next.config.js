
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");


module.exports = withImages(
  withCSS({
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
    },
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      return config
    }
  }),
);
