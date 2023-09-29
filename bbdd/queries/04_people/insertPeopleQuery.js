const getConnection = require("../../getConnection");

const insertPeopleQuery = async (
  name,
  short_desc,
  text,
  bio,
  type,
  image,
) => {
  let connection;

  try {
    connection = await getConnection();

    // Insertamos la sesión y obtenemos los datos de la misma.
    const [newPeople] = await connection.query(
      `
                INSERT INTO people (name, short_desc, text, bio, type, image, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
      [
        name,
        short_desc,
        text,
        bio,
        type,
        image,
        new Date(),
      ]
    );

    // Retornamos el id que le ha asignado la base de datos a esta nueva sesión
    return newPeople.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPeopleQuery;
