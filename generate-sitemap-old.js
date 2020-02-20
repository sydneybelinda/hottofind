
const sitemap = require('nextjs-sitemap-generator');  
const config = require('./config')

sitemap({  
  
  baseUrl: config.URL,  
  ignoredPaths: ['dashboard'],  
  pagesDirectory: __dirname + "\\pages",  
  targetDirectory : 'public/',
  nextConfigPath: __dirname + "\\sitegen.config.js",
  ignoredExtensions: [
        'png',
        'jpg'
  ],
  pagesConfig: {
    '/': {
      priority: '0.5',
      changefreq: 'daily'
    }
  }
});