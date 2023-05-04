const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");
const selectAllSectionsQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [sections] = await connection.query(`SELECT * FROM sections`);

    if (sections < 1) {
      throw generateError("No se ha encontrado ninguna sección!", 404);
    }
    return sections;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllSectionsQuery;
