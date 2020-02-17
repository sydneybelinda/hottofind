const { Client } = require("elasticsearch");

var client = new Client({
    // default is fine for me, change as you see fit
    host: "elasticsearch.hottofind.com",
    log: "trace",
    apiVersion: "7.5"
  });


const updateElastic = async post => {

   
    var index = await client.index({
        index: 'hottofind',
        id: post.id || '',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: post
      })

    console.log(index)
}

export default updateElastic