const { Client } = require("elasticsearch");

var client = new Client({
    // default is fine for me, change as you see fit
    host: "elasticsearch.hottofind.com",
    log: "trace",
    apiVersion: "7.5"
  });


const deleteElastic = async id => {


  if(id){
   
    var index = await client.deleteByQuery({
        index: 'hottofind',
        body: {
            query: {
                match: { id: id }
            }
         }
      })

    } 



    console.log(index)
}

export default deleteElastic