
import { File, Post } from "../../../models";




export default async (req, res) => {


  try {
    const posts = await Post.findAll({

      include: [
        {
          model: File,
          as: "files"
        }
      ],
    });



    if (!posts) {
      return res.status(404).send({
        message: "404 posts"
      });
    }


    var elasticsearch = require('elasticsearch')

var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
  host: 'db.hottoind.com:9200',
  log: 'trace'
});


for (var i = 0; i < posts.length; i++ ) {
    client.index({
        index: 'hottofind',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: posts
      }, function(error, response) {
      if (error) {
        console.error(error);
        return;
      }
      else {
      console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
      }
    });
  }


    return res.status(200).send('done');
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};




// for (var a = 0; a < forms.length; a++ ) {  // Same stuff here, just slight changes in type and variables
//   client.create({
//     index: "epubs",
//     type: "form",
//     id: a,
//     body: forms[a]
//   }, function(error, response) {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     else {
//     console.log(response);
//     }
//   });
// }