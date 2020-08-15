import jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../../../config";
import { User } from "../../models";

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    //    return res.status(401).send('Authorization header missing')
  }

  const auth = await req.headers.authorization;

  const decoded = jwt.verify(auth, PRIVATEKEY);

  try {
    const getUser = async obj => {
      return await User.findOne({
        where: obj
      });
    };

    let data = await getUser({ id: decoded.id });

    if (data) {
      return res.status(200).json({ data });
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
