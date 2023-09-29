const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectAllPeopleQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [people] = await connection.query(`SELECT P.*, M.imageName  FROM people P LEFT JOIN peopleMedia M ON P.id = M.idPeople`);

    if (people < 1) {
      throw generateError("No se ha encontrado ninguna persona!", 404);
    }

    return people;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllPeopleQuery;
