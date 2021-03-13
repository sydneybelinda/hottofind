
const withImages = require("next-images");
// const withCSS = require("@zeit/next-css");


module.exports = withImages(
{
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
    },
  },
);
