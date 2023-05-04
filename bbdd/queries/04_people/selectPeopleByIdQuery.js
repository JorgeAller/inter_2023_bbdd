const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");
const selectPeopleByIdQuery = async (idPeople) => {
  let connection;
  try {
    connection = await getConnection();

    const [people] = await connection.query(
      `SELECT * FROM people P WHERE P.id = ? `,
      [idPeople]
    );
    if (people < 1) {
      throw generateError(
        "No se ha encontrado ninguna persona con ese id!",
        404
      );
    }
    return people;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectPeopleByIdQuery;
