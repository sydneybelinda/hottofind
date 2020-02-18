import { Post } from "../../../models";

export default async (req, res) => {
  if (req.method === "POST") {
    const {id, username} = req.body;
 

    try {
        const post = await Post.findOne({
            where: {
              id: id,
              owner: username
            }
          });
  
          if (!post) {
            return res.status(404).send({
              message: "404 on post update"
            });
          }
  
          const updatedPost = await post.update(
            {
              status: "Paused"
            })

      return res.status(200).json({ post, msg: "post disabled successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
