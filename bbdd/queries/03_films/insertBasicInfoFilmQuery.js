const getConnection = require("../../getConnection");

const insertBasicInfoFilmQuery = async (
  director,
  year,
  duration,
  sponsor,
  country
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newBasicInfoFilm] = await connection.query(
      `
                INSERT INTO basic_info (
                    director,
                    year,
                    duration,
                    sponsor,
                    country,
                    createdAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
      [director, year, duration, sponsor, country, new Date()]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newBasicInfoFilm.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertBasicInfoFilmQuery;
