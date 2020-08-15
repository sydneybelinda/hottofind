const { Client } = require("elasticsearch");

var client = new Client({
    // default is fine for me, change as you see fit
    host: "elasticsearch.hottofind.com",
    log: "trace",
    apiVersion: "7.5"
  });


const updateElastic = async post => {

const data = {
  id: post.id,
  title: post.title,
  description: post.description,
  catindex: post.catindex,
  keyindex: post.keyindex,
  country: post.country,
  age: post.age,
  cities: post.cities,
  //   currency: post.currency.value,
  price: post.price,
  location: post.location,
  owner: post.owner,
  website: post.website,
  twitter: post.twitter,
  facebook: post.facebook,
  status: post.status,
  email: post.email,
  phone: post.phone,
  firstname: post.firstname,
  lastname: post.lastname,
  status: "Active",
  files: post.files
}

  if(post.id){
   
    var index = await client.index({
        index: 'hottofind',
        id: post.id,
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: data
      })

    }  else { 
      var index = await client.index({
        index: 'hottofind',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: data
      })

    }



    console.log(index)
}

export default updateElastic