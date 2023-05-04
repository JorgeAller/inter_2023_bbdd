const selectAllPeopleQuery = require("../../bbdd/queries/04_people/selectAllPeopleQuery");

const listPeople = async (req, res, next) => {
  try {
    const people = await selectAllPeopleQuery();

    res.send({
      status: "ok",
      message: "Aquí tienes las personas:",
      data: { people },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listPeople;
