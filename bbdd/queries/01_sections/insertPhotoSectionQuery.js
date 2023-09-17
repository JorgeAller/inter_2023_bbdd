const getConnection = require("../../getConnection");

const insertPhotoSectionQuery = async (media, idSection) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `INSERT INTO sectionsMedia (name, idSection, createdAt) VALUES (?, ?, ?)`,
      [media, idSection, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoSectionQuery;
