const getConnection = require("../../getConnection");

const insertPhotoSessionQuery = async (media, idSession) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `INSERT INTO sessionsMedia (name, idSession, createdAt) VALUES (?, ?, ?)`,
      [media, idSession, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoSessionQuery;
