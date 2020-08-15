import { User} from "../../../../models";

export default async (req, res) => {
  const {
    query: { serial }
  } = req;



  try {

    var items;
    items = await User.findAll({
      where: {
        passwordreset: serial
      }
    });

    if(!items){
      items = '{}';
    }


    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send(err);
  }

};
