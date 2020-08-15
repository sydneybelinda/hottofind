const fetch = require("isomorphic-unfetch");
const config = require("./config");
const fs = require("fs");

function makeSlug(string, id) {
  const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");
  const slug = string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters in a with b
    .replace(/&/g, "-and-") // Replace & with ‘and’
    .replace(/[^\w-]+/g, "") // Remove all non-word characters such as spaces or tabs
    .replace(/--+/g, "-") // Replace multiple — with single -
    .replace(/^-+/, "") // Trim — from start of text
    .replace(/-+$/, ""); // Trim — from end of text

  const s = slug + "~" + id;

  return s;
}

async function run() {
  sitemap = "./public/sitemap.xml";

  var now = new Date();
  var dj = now.toJSON();
  var today = dj.split("T")[0];

  if (fs.existsSync(sitemap)) {
    fs.unlinkSync(sitemap);
  }

  let response = await fetch(`${config.API}/posts/getallsitemap/${config.COUNTRYCODE}`);
  const posts = await response.json();

  let responseb = await fetch(`${config.API}/category/get`);
  const categories = await responseb.json();
  var line = '';
  var num = 0;

  
  const url = `${config.API}/city/get/${config.COUNTRYCODE}`;
  const res = await fetch(url);
  let cities = await res.json();
  


  var mainCats = [];
  categories.forEach(function(item) {
    var i = mainCats.findIndex(x => x.catindex == item.catindex);
    if (i <= -1) {
      mainCats.push(item);
    }
  });
  
  num++ 

  line += `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${config.URL}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${config.URL}/register</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${config.URL}/login</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;


 

  mainCats.map((cat, key) => {
    line += `<url><loc>${config.URL}/posts/${cat.catindex}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;

    num++

    cities.map((cit, key) => {
      line += `<url><loc>${config.URL}/posts/${cat.catindex}?city=${cit.city.toLowerCase()}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;

    num++

    });


  });

  categories.map((catb, key) => {

    line += `<url><loc>${config.URL}/posts/${catb.catindex}/${catb.keyindex}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;

      num++

      cities.map((cit, key) => {
        line += `<url><loc>${config.URL}/posts/${catb.catindex}/${catb.keyindex}?city=${cit.city.toLowerCase()}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
  
      num++
  
      });

   });

       posts.map((post, key) => {
        line += `<url><loc>${config.URL}/post/${makeSlug(post.title, post.id)}</loc><lastmod>2020-02-17</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;

        num++
      });


  line += `</urlset>`

  fs.appendFile(sitemap, line, err => {
    if (err) throw err;
  });

  console.log(num)
}



run();
