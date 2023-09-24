const selectFilmsByIdSessionQuery = require("../../bbdd/queries/03_films/selectFilmByIdSessionQuery");

const listFilmsByIdSession = async (req, res, next) => {
  try {
    const { idSession } = req.params;
    const films = await selectFilmsByIdSessionQuery(idSession);
    console.log('peliculas' ,films);
    res.send({
      status: "ok",
      message: `Películas de la sesion id: ${idSession}`,
      data: {
        films,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFilmsByIdSession;