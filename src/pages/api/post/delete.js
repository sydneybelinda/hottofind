import { Post } from "../../../models";

export default async (req, res) => {
  if (req.method === "POST") {
    const id = req.body.id;
 

    try {
      const post = await Post.destroy({
        where: { id: id }
      });

      return res.status(200).json({ post, msg: "post deleted successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
