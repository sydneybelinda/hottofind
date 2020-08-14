import { Message } from ".././../../models";


export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;



      try {
        const message = await Message.create(
          {
            content: data.content,
            subject: data.subject,
            from_username: data.from_username,
            to_username: data.to_username,
            read: data.read
          }
        );

        console.log(message)

        return res.status(200).send(message);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }

  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
};
