const getConnection = require("../bbdd/getConnection");

const { generateError } = require("../helpers");

const sectionExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { idSection } = req.params;

    // Comprobamos que el ejercicio exista.
    const [sections] = await connection.query(
      `SELECT * FROM sections WHERE id = ?`,
      [idSection]
    );

    if (sections.length < 1) {
      throw generateError("Sección no encontrada", 404);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sectionExists;
