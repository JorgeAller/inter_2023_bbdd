const insertSectionQuery = require("../../bbdd/queries/01_sections/insertSectionQuery");

const { generateError } = require("../../helpers");

const newSection = async (req, res, next) => {
  try {
    const { type, title, short_desc, bio, cur_text } = req.body;

    if (!type || !title || !short_desc || !bio || !cur_text) {
      throw generateError("Faltan campos", 400);
    }

    // if (req.user.role === "normal") {
    //   throw generateError(
    //     "No tienes los permisos necesarios para subir un ejercicio. Debes ser un entrenador para añadir nuevos ejercicios",
    //     401
    //   );
    // }

    //

    // Insertamos la entrada y obtenemos el id que se le ha asignado
    // en la base de datos.
    const idSection = await insertSectionQuery(
      type,
      title,
      short_desc,
      bio,
      cur_text
    );

    res.send({
      status: "ok",
      data: {
        Sección: {
          id: idSection,
          type,
          title,
          short_desc,
          bio,
          cur_text,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newSection;
