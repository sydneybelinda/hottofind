import { File, Post } from "../../../models";

export default async (req, res) => {

  async function getSort(p) {
        switch(p) {
      case 'latest':
        return ["createdAt", "DESC"];
        case 'oldest':
          return ["createdAt", "ASC"];
      default:
        return ["createdAt", "DESC"]
    }

  }



  const {
    query: { catindex, keyindex, countrycode, city, sort, page = 1 }
  } = req;

  const limit = 100;
  const offset = (limit * page) - limit
  const order = await getSort(sort)

  console.log("offset: ", offset)

  let where = { country: countrycode };

  if (catindex) {
    var ci = { catindex: catindex };

    where = {
      ...where,
      ...ci
    };
  }
  if (keyindex) {
    var ki = { keyindex: keyindex };

    where = {
      ...where,
      ...ki
    };
  }

  if (city) {
    var cty = { cities: city };

    where = {
      ...where,
      ...cty
    };
  }

  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      where: where,
      include: [
        {
          model: File,
          as: "files"
        }
      ],
      distinct:true,
      order: [order],
    //  limit: limit,
    //  offset: offset,
    });

    //   const posts = await Post.findAndCountAll({
    //     where: where,
    //     order: [['createdAt', 'DESC']],
    //     limit: 40,
    //     offset: offset,
    // })

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
