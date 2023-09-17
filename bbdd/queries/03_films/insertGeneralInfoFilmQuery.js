const getConnection = require("../../getConnection");

const insertGeneralInfoFilmQuery = async (
  bio,
  credits,
  genre,
  title_original,
  translated_title,
  lang,
  subt_lang,
  film_type,
  premiere_type
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newGeneralInfoFilm] = await connection.query(
      `
                INSERT INTO general_info (
                    bio,
                    credits,
                    genre,
                    title_original,
                    translated_title,
                    lang,
                    subt_lang,
                    film_type,
                    premiere_type,
                    createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            // AÑADIR FESTIVALES
      [
        bio,
        credits,
        genre,
        title_original,
        translated_title,
        lang,
        subt_lang,
        film_type,
        premiere_type,
        new Date(),
      ]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newGeneralInfoFilm.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertGeneralInfoFilmQuery;
