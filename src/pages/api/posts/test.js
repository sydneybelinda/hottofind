import { File, Post } from "../../../models";

export default async (req, res) => {
  const {
    query: { countrycode }
  } = req;

  let where = {
    country: countrycode
  };

  try {
    const posts = await Post.findAll({
      where: where,
      include: [
        {
          model: File,
          as: "files"
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: 100
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
