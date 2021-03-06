import * as post from "models/post";
import { Post } from "../../../models";
import getConfig from "../../../../confignew";
const { Op } = require("sequelize");

export default async (req, res) => {
  const {config} = getConfig(req);
  const countrycode = config.COUNTRYCODE;


    const posts = [];
    const rows = [];

    const {
        query: {  search }
      } = req;


    let where = { country: countrycode}
      let d = {
        [Op.or]: [
          {  description: {[Op.like]: '%' + search + '%'  } },
          {  title: {[Op.like]: '%' + search + '%'  } }
        ]
      
      }
  
      where = {
        ...where,
        ...d
    }

  try {
    const posts = await Post.findAll({
        attributes: [
            'id', 'title', 
          ],
        where: where
    });



    return res.status(200).send(posts);
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
