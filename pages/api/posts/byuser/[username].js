import { Post, File } from "../../../../models";

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


export default async (req, res) => {

  const {
    query: {  username , sort, page = 1 }
  } = req;


  const limit = 100;
  const offset = (limit * page) - limit
  const order = await getSort(sort)


  let where = {
    owner: username
  };

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
      order: [order]
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
