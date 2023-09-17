const getConnection = require("../../getConnection");

const insertTeamFilmQuery = async (
  writer,
  dir_photo,
  editor,
  sound,
  exec_prod,
  other,
  prod,
  prod_company,
  distr_company,
  participants
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newTeamFilm] = await connection.query(
      `
                INSERT INTO team (
                    writer,
                    dir_photo,
                    editor,
                    sound,
                    exec_prod,
                    other,
                    prod,
                    prod_company,
                    distr_company,
                    participants, 
                    createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        writer,
        dir_photo,
        editor,
        sound,
        exec_prod,
        other,
        prod,
        prod_company,
        distr_company,
        participants,
        new Date(),
      ]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newTeamFilm.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertTeamFilmQuery;
