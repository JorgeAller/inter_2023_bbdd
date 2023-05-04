const selectAllFilmsQuery = require("../../bbdd/queries/03_films/selectAllFilmsQuery");

const listFilms = async (req, res, next) => {
  try {
    const films = await selectAllFilmsQuery();

    res.send({
      status: "ok",
      message: "Aquí tienes las peliculas:",
      data: { films },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFilms;
