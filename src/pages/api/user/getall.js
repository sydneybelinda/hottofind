import { File, User } from "../../../models";

export default async (req, res) => {


  try {
    const u = await User.findAll({

    //   include: [
    //     {
    //       model: File,
    //       as: "files"
    //     }
    //   ],
    });

    //console.log(posts);



    // if (!posts) {
    //   return res.status(404).send({
    //     message: "404 posts"
    //   });
    // }

    return res.status(200).send(u);
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
