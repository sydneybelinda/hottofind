
const fetch = require('isomorphic-unfetch')
const config = require("./config");

function makeSlug(string,id){
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  const slug = string.toString().toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters in a with b
  .replace(/&/g, '-and-') // Replace & with ‘and’
  .replace(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
  .replace(/--+/g, '-') // Replace multiple — with single -
  .replace(/^-+/, '') // Trim — from start of text
  .replace(/-+$/, ''); // Trim — from end of text

  const s = slug + '~' + id

return s
}

module.exports = {
 
    async exportPathMap() {
      // we fetch our list of posts, this allow us to dynamically generate the exported pages
      const response = await fetch(
        `${config.API}/posts/getallsitemap`
      )
      const postList = await response.json()
  
      // tranform the list of posts into a map of pages with the pathname `/post/:id`
      const pages = postList.reduce(
        (pages, post) =>
          Object.assign({}, pages, {
            [`/post/${makeSlug(post.title, post.id)}`]: { page: '/post/[id]' },
          }),
        {}
      )
  
      // combine the map of post pages with the home
      return Object.assign({}, pages, {
        '/': { page: '/' },
      })
    },
}