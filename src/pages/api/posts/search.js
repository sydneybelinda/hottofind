import * as post from "models/post";
import { Post } from "../../../models";
import {COUNTRYCODE} from "../../../../config"
const { Op } = require("sequelize");

export default async (req, res) => {

    const posts = [];
    const rows = [];

    const {
        query: {  search }
      } = req;


    let where = { country: COUNTRYCODE}
      let d = {description: {
                [Op.like]: '%' + search + '%'   
      }}
  
      where = {
        ...where,
        ...d
    }

  try {
    const p = await Post.findAll({
        attributes: [
            'id', 'title', 
          ],
        where: where
    });

    if(p){
        posts.push(p)
    }else{

        let where = { country: COUNTRYCODE}
        let d = {title: {
            [Op.like]: '%' + search + '%'   
  }}
    
        where = {
          ...where,
          ...d
      }
        const t = await Post.findAll({
            attributes: [
                'id', 'title', 
              ],
            where: where
        });
        if(t){
         //   posts.push(t)
        }
    
    }
    



    // if (!posts) {
    //   return res.status(404).send({
    //     message: "404 posts"
    //   });
    // }

    return res.status(200).send(posts);
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
