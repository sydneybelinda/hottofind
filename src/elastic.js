'use strict'

const {Post, File} = require('./models')

const { Client } = require('elasticsearch')
//const client = new Client({ node: 'http://db.hottofind.com:9200' })

var client = new Client({  // default is fine for me, change as you see fit
    host: 'db.hottofind.com:9200',
    log: 'trace',
    apiVersion: '7.5',
  });

async function run () {

    const posts = await Post.findAll({
        include: [
          {
            model: File,
            as: "files"
          }
        ],
      });


      for (var i = 0; i < posts.length; i++ ) {

          await client.index({
    index: 'hottofind',
    // type: '_doc', // uncomment this line if you are using {es} ≤ 6
    body: posts[i]
  })


console.log(posts[i].id)

      }


  // Let's start by indexing some data
//   await client.index({
//     index: 'game-of-thrones',
//     // type: '_doc', // uncomment this line if you are using {es} ≤ 6
//     body: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     // type: '_doc', // uncomment this line if you are using {es} ≤ 6
//     body: {
//       character: 'Daenerys Targaryen',
//       quote: 'I am the blood of the dragon.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     // type: '_doc', // uncomment this line if you are using {es} ≤ 6
//     body: {
//       character: 'Tyrion Lannister',
//       quote: 'A mind needs books like a sword needs a whetstone.'
//     }
//   })

  // We need to force an index refresh at this point, otherwise we will not
  // get any result in the consequent search
  // await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
//   const { body } = await client.search({
//     index: 'game-of-thrones',
//     // type: '_doc', // uncomment this line if you are using {es} ≤ 6
//     body: {
//       query: {
//         match: { quote: 'winter' }
//       }
//     }
//   })

//  console.log(body.hits.hits)
}

run().catch(console.log)