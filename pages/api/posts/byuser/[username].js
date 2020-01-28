import { Post } from "../../../../models";

export default async (req, res) => {
  const {
    query: { username }
  } = req;

  let where = {
    owner: username
  };

  try {
    const posts = await Post.findAll({
      where: where,
      order: [["id", "DESC"]]
    });

    if (!posts) {
      return res.status(404).send({
        message: "No posts found"
      });
    }

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
