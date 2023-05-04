const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectAllSessionsQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [sessions] = await connection.query(`SELECT * FROM sessions`);

    if (sessions < 1) {
      throw generateError("No se ha encontrado ninguna sesión!", 404);
    }

    return sessions;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllSessionsQuery;
