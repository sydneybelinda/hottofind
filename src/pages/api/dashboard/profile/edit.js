import { User } from "../../../../models";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const user = await User.update(
        {
          email: data.email.toLowerCase(),
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          country: data.country,
          postcode: data.postcode
        },
        {
          where: {
            username: data.username
          }
        }
      );

      return res
        .status(200)
        .json({ user, msg: "profile updated successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
