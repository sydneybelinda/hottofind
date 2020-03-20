import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../../../config";
import { User } from "../../../models";


export default async (req, res) => {

    
  try {
    let errors = {};

    if (req.method === "POST") {
      const { password, serial, username } = req.body;


      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

     

      const user = await User.findOne({
        where: {
          passwordreset: serial
        }
      });

      // console.log(user);

      if (!user) {
        return res.status(404).json({error: "user not found"});
      }

      const updatedUser = await user.update({
        passwordreset: '',
        salt: salt,
        password: hash
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
