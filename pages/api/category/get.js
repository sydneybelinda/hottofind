import { Category } from '../../../models';

export default async (req, res) => {
  try {
    const categories = await Category.findAll({
      order:[ 
        ["maincategory", "ASC"]
      ]
    });

    if (!categories) {
      return res.status(404).send({
        message: "404 categories"
      });
    }

    return res.status(200).send(categories);
    // return res.json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
