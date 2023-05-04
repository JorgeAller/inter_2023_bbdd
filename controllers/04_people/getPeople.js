const selectPeopleByIdQuery = require("../../bbdd/queries/04_people/selectPeopleByIdQuery");

const getPeople = async (req, res, next) => {
  try {
    const { idPeople } = req.params;
    const people = await selectPeopleByIdQuery(idPeople);
    console.log("controller", people);
    res.send({
      status: "ok",
      message: `Persona id: ${idPeople}`,
      data: {
        people,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getPeople;
