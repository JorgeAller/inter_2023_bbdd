const getConnection = require("../../getConnection");

const insertPhotoFilmQuery = async (media, idFilm) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `INSERT INTO filmsMedia (name, idFilm, createdAt) VALUES (?, ?, ?)`,
      [media, idFilm, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoFilmQuery;
