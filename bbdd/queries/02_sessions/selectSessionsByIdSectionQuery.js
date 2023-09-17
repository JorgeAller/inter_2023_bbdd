const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");
const selectSessionsByIdSectionQuery = async (idSection) => {
  let connection;
  try {
    connection = await getConnection();

    const [sessions] = await connection.query(
      `SELECT * FROM sessions S WHERE S.idSection = ? `,
      [idSection]
    );

    if (sessions < 1) {
      throw generateError(
        `No se ha encontrado ninguna sesión en la seccion con el id ${idSection}!`,
        404
      );
    }
    return sessions;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectSessionsByIdSectionQuery;
