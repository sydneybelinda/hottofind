import { Post } from "../../../../models";

export default async (req, res) => {
  const {
    query: { id }
  } = req;




  try {

    const post = await Post.findOne({
      where: {
        id: id
      }
    });

   

    const views = parseInt(post.views)
    const newViews = views +1

    const updatedPost = await post.update(
        {
            views: newViews
        })
    
    return res.status(200).send(updatedPost);
  } catch (err) {
    return res.status(500).send(err);
  }

};
