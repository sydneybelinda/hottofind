import { Message, MessageFile } from "../../../../models";

const { Op } = require("sequelize");

async function getSort(p) {
  switch(p) {
case 'latest':
  return ["createdAt", "DESC"];
  case 'oldest':
    return ["createdAt", "ASC"];
  case 'active':
    return ["status", "ASC"];
    case 'disabled':
      return ["status", "DESC"];    
default:
  return ["createdAt", "DESC"]
}

}


export default async (req, res) => {

  const {
    query: {  username , sort, page = 1 }
  } = req;


  const limit = 100;
  const offset = (limit * page) - limit
  const order = await getSort(sort)


  let where = {
    [Op.or]: [
      { from_username: username },
      { to_username: username }
    ]
  };

  try {
    const messages = await Message.findAndCountAll({
      limit,
      offset,
      where: where,
      include: [
        {
          model: MessageFile,
          as: "files"
        }
      ],
      distinct:true,
      order: [order]
    });

    if (!messages) {
      return res.status(404).send({
        message: "No messages found"
      });
    }

    return res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
