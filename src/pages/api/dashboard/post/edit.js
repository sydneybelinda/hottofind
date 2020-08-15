import { File, Post } from "../../../../models";

async function addFile(id, name, owner) {
  const addFile = await File.create({
    postId: id,
    name: name,
    owner: owner
  });

  return addFile;
}

export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const files = req.body.uploads;

    if (data.id) {
      try {
        const post = await Post.findOne({
          where: {
            id: data.id,
            owner: data.owner
          }
        });

        if (!post) {
          return res.status(404).send({
            message: "404 on post update"
          });
        }

        const updatedPost = await post.update(
          {
            title: data.title,
            description: data.description,
            //  userId: req.user.id,
            catindex: data.catindex,
            keyindex: data.keyindex,
            country: data.country,
            cities: data.city,
            currency: data.currency,
            price: data.price,
            age: data.age,
            location: data.location,
            owner: data.owner,
            website: data.website,
            twitter: data.twitter,
            facebook: data.facebook,
            status: data.status,
            email: data.email,
            phone: data.phone,
            firstname: data.firstname,
            lastname: data.lastname,
            files: files
          },
          {
            include: [{ model: File, as: "files" }]
          }
        );

        files.map(async f => {
          const file = await File.findOne({
            where: {
              name: f.name
            }
          });

          if (!file) {
            addFile(post.id, f.name, f.owner);
          }
        });

        return res.status(200).send(updatedPost);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    } else {
      var resultId = "";

      try {
        const post = await Post.create(
          {
            title: data.title,
            description: data.description,
            catindex: data.catindex,
            keyindex: data.keyindex,
            country: data.country,
            age: data.age,
            cities: data.cities,
            //   currency: data.currency.value,
            price: data.price,
            location: data.location,
            owner: data.owner,
            website: data.website,
            twitter: data.twitter,
            facebook: data.facebook,
            status: data.status,
            email: data.email,
            phone: data.phone,
            firstname: data.firstname,
            lastname: data.lastname,
            status: "Active",
            files: files
          },
          {
            include: [{ model: File, as: "files" }]
          }
        );

        return res.status(200).send(post);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    }
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
