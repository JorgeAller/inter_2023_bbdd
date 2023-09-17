const getConnection = require("../../getConnection");

const insertSectionQuery = async (
  type,
  title,
  short_desc,
  bio,
  cur_text,
  image
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos el ejercicio y obtenemos los datos del mismo.
    const [newSection] = await connection.query(
      `
                INSERT INTO sections (type, title, short_desc, bio, cur_text, image, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
      [type, title, short_desc, bio, cur_text, image, new Date()]
    );

    // Retornamos el id que le ha asignado la base de datos a este nuevo ejercicio
    return newSection.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertSectionQuery;
