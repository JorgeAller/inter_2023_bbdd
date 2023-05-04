const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectSectionByIdQuery = async (idSection) => {
  let connection;
  try {
    connection = await getConnection();

    const [sections] = await connection.query(
      `SELECT * FROM sections S WHERE S.id = ? `,
      [idSection]
    );

    if (sections < 1) {
      throw generateError(
        "No se ha encontrado ninguna sección con ese id!",
        404
      );
    }

    return sections;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectSectionByIdQuery;
