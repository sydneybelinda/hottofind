import {  Post } from "../../../../models";

export default async (req, res) => {
  const {
    query: {  countrycode }
  } = req;

  try {
    const posts = await Post.findAll({
        where: {
            country: countrycode
        },
        attributes: ['id', 'title']
    });



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
