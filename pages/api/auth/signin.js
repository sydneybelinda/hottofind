import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../../../config";
import { User } from "../../../models";

export default async (req, res) => {
  try {
    let errors = {};

    if (req.method === "POST") {
      const { username, password } = req.body;
      User.findOne({
        where: { username: username }
      }).then(user => {
        if (!user) {
          let error = {};
          errors.email = "No Account Found";
          // const error = new Error(errors.email)
          error.response = "No Account Found";
          res.status(400).json(error);
          //  throw error
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // const id  = user.id
            // return res.status(200).json({ token: id })

            const payload = {
              id: user.id,
              username: user.username,
              email: user.email
            };

            let token = jwt.sign(payload, PRIVATEKEY);
            res.json({ msg: "ok", token: `${token}`, user: user });

            // jwt.sign(payload, secret, { expiresIn: 36000 },
            //         (err, token) => {
            //           if (err) res.status(500)
            //           .json({ error: "Error signing token",
            //                  raw: err });
            //            res.status(200).json({
            //            msg: ok,
            //            token: `Bearer ${token}` });
            // });
          } else {
            errors.password = "Password is incorrect";
            error.response = "Password is incorrect";
            res.status(400).json(error);
          }
        });
      });
    }

    //     const response = await fetch(url)

    //     if (response.ok) {
    //       const { id } = await response.json()
    //       return res.status(200).json({ token: id })
    //     } else {
    //       // https://github.com/developit/unfetch#caveats
    //       const error = new Error(response.statusText)
    //       error.response = response
    //       throw error
    //     }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ response: response.statusText })
      : res.status(400).json({ response: error.message });
  }
};
//}
