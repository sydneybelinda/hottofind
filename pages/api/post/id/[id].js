import { File, Post } from "../../../../models";

export default async (req, res) => {
  const {
    query: { id }
  } = req;

  console.log(id)

  try {
    // const posts = await Post.findAll({
    //   });
    const posts = await Post.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: File,
          as: "files"
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }

  //   const getUser = async obj => {
  //     return await User.findOne({
  //       where: obj,
  //     });
  //   };

  //   let user = await getUser({ id: id });

  //   if (user) {
  //     res.status(200).json({ user: user });
  //     //  next(null, user);
  //    } else {
  //     res.status(401).json({ message: 'No such user found' });
  //     //  next(null, false);
  //    }
};
