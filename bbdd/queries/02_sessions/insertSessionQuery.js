const getConnection = require("../../getConnection");

const insertSessionQuery = async (
  idSection,
  title,
  date,
  hour,
  place,
  duration,
  bio,
  cur_text
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newSession] = await connection.query(
      `
                INSERT INTO sessions (idSection, title, date, hour, place, duration, bio, cur_text, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [idSection, title, date, hour, place, duration, bio, cur_text, new Date()]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newSession.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertSessionQuery;
