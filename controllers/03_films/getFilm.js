const selectFilmByIdQuery = require("../../bbdd/queries/03_films/selectFilmByIdQuery");

const getFilm = async (req, res, next) => {
  try {
    const { idFilm } = req.params;
    const film = await selectFilmByIdQuery(idFilm);
    console.log("controller", film);
    res.send({
      status: "ok",
      message: `Película id: ${idFilm}`,
      data: {
        film,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFilm;
