const getConnection = require("../../getConnection");

const insertFilmQuery = async (
  idSession,
  idBasicInfo,
  idGeneralInfo,
  idTechnicalInfo,
  idTeam,
  title,
  short_desc,
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

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newFilm.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFilmQuery;
