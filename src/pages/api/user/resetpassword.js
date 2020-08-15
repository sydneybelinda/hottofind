import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../../../../config";
import { User } from "../../../models";

export default async (req, res) => {

    
  try {
    let errors = {};

    if (req.method === "POST") {
      const { email, passwordreset } = req.body;

      console.log(req.body);

      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(404).json({error: "email not found"});
      }

      const updatedUser = await user.update({
        passwordreset: passwordreset
      });


      if (updatedUser) {
        res.status(200).json({status: "successful"});
      } else {
        res.status(200).json({error: "failed"});
      }
    }
  } catch (error) {
    res.status(400).json({error: error});
  }
};
//}
