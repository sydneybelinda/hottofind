import { Post } from "../../../../../models";
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op


export default async (req, res) => {
  const {
    query: { title }
  } = req;

  var t = title.split("-")[0]
  var owner = title.split("-")[1]


  try {

    var posts;
    posts = await Post.findAll({
      where: {
        title: {
            [Op.like]: `%${title}%`
        },
        [Op.and]: [
          { owner: owner },
        ]
      },
    });

    if(!posts){
      posts = '{}';
    }


    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }


};
