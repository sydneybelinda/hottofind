import { User } from "../../../../models";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const user = await User.update(
        {
          avatar: data.name
        },
        {
          where: {
            username: data.username
          }
        }
      );

      return res
        .status(200)
        .json({ user, msg: "profile pic updated successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
