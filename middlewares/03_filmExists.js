const getConnection = require("../bbdd/getConnection");

const { generateError } = require("../helpers");

const filmExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { idFilm } = req.params;

    // Comprobamos que el ejercicio exista.
    const [films] = await connection.query(`SELECT * FROM films WHERE id = ?`, [
      idFilm,
    ]);

    if (films.length < 1) {
      throw generateError("Película no encontrada", 404);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = filmExists;
