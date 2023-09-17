const getConnection = require("../../getConnection");

const insertTechnicalInfoFilmQuery = async (
  sound_format,
  color_bn,
  recording_format,
  exhibition_format,
  film_dimmension
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newTechnicalInfoFilm] = await connection.query(
      `
      INSERT INTO technical_info (
        sound_format,
        color_bn,
        recording_format,
        exhibition_format,
        film_dimmension,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        sound_format,
        color_bn,
        recording_format,
        exhibition_format,
        film_dimmension,
        new Date(),
      ]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newTechnicalInfoFilm.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertTechnicalInfoFilmQuery;
