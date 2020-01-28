import { City } from "../../../../models";

export default async (req, res) => {
  try {
    const cities = await City.findAll({
      order: [["city", "ASC"]]
    });

    if (!cities) {
      return res.status(404).send({
        message: "No cities found"
      });
    }

    return res.status(200).send(cities);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
