import { User} from "../../../../models";

export default async (req, res) => {
  const {
    query: { username }
  } = req;



  try {

    var items;
    items = await User.findAll({
      where: {
        username: username
      }
    });

    // if(!items){
    //   items = '{}';
    // }


    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send(err);
  }

};
