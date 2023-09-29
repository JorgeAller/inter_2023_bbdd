const getConnection = require("../../getConnection");

const insertFilmQuery = async (
  idSession,
  idBasicInfo,
  idGeneralInfo,
  idTechnicalInfo,
  idTeam,
  title,
  short_desc,
  idPeople
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newFilm] = await connection.query(
      `
                INSERT INTO films (
                    idSession,
                    basic_info_id,
                    general_info_id,
                    technical_info_id,
                    team_id,
                    title,
                    short_desc,
                    createdAt
                  )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        idSession,
        idBasicInfo,
        idGeneralInfo,
        idTechnicalInfo,
        idTeam,
        title,
        short_desc,
        new Date(),
      ]
    );



    const filmId = newFilm.insertId;

    // Ahora, insertamos la relación en la tabla "people_films" usando el parámetro idPeople
    await connection.query(
      `
      INSERT INTO people_films (people_id, films_id, createdAt)
      VALUES (?, ?)
      `,
      [idPeople, filmId, new Date()]
    );

    return filmId; // Retornamos 
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFilmQuery;
