const getConnection = require("../bbdd/getConnection");

const { generateError } = require("../helpers");

const sessionExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    let { idSession } = req.params;

    if (!idSession) {
      idSession = req.body.idSession;
    }

    // Comprobamos que el ejercicio exista.
    const [sessions] = await connection.query(
      `SELECT * FROM sessions WHERE id = ?`,
      [idSession]
    );

    if (sessions.length < 1) {
      throw generateError("Sesión no encontrada", 404);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sessionExists;
