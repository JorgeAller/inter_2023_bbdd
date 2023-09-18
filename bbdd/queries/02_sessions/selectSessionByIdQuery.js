const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");
const selectSessionByIdQuery = async (idSession) => {
  let connection;
  try {
    connection = await getConnection();

    const [sessions] = await connection.query(
      `SELECT
        S.*,
        M.name
      FROM 
        sessions S 
        LEFT JOIN sessionsMedia M ON S.id = M.idSession
        WHERE S.id = ? `,
      [idSession]
    );
    console.log(sessions);

    if (sessions < 1) {
      throw generateError(
        "No se ha encontrado ninguna sesión con ese id!",
        404
      );
    }
    return sessions;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectSessionByIdQuery;
