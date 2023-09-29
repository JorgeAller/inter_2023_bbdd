const getConnection = require("../bbdd/getConnection");

const { generateError } = require("../helpers");

const peopleExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { idPeople } = req.params;

    // Comprobamos que el ejercicio exista.
    const [people] = await connection.query(
      `SELECT * FROM people WHERE id = ?`,
      [idPeople]
    );

    if (people.length < 1) {
      throw generateError("Persona no encontrada", 404);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = peopleExists;
