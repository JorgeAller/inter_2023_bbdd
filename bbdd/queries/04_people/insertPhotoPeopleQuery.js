const getConnection = require("../../getConnection");

const insertPhotoPeopleQuery = async (media, idPeople) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `INSERT INTO peopleMedia (imageName, idPeople, createdAt) VALUES (?, ?, ?)`,
      [media, idPeople, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoPeopleQuery;
