import { City } from "../../../../models";

export default async (req, res) => {
  const {
    query: { countrycode }
  } = req;

  let where = {
    countrycode: countrycode
  };

  try {
    const cities = await City.findAll({
      where: where,
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
