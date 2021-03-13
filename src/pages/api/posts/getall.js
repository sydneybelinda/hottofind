import { File, Post, sequelize} from "../../../models";
import {COUNTRYCODE} from "../../../../config";

const s = require('sequelize');


export default async (req, res) => {


  try {
    // const posts = await Post.findAll({
    //   where: {
    //     country: COUNTRYCODE
    //   },
    //   // include: [
    //   //   {
    //   //     model: File,
    //   //     as: "files"
    //   //   }
    //   // ],
    // });


    //const posts = await s.query('SELECT * FROM posts');
    const posts = await sequelize.query('SELECT * FROM posts WHERE country="AU"');


//const posts = [];

  



    if (!posts) {
      return res.status(404).send({
        message: "404 posts"
      });
    }

    return res.status(200).send(posts);
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
