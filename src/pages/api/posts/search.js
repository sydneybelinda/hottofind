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
