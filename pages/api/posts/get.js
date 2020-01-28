import { File, Post } from "../../../models";

export default async (req, res) => {
  const {
    query: { catindex, keyindex, countrycode, city, page = 1 }
  } = req;

  const order = "";
  const limit = 100;
  //  const offset = limit * (page-1)

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
      where: where,
      include: [
        {
          model: File,
          as: "files"
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: limit
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
