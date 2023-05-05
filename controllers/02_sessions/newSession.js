const insertSessionQuery = require("../../bbdd/queries/02_sessions/insertSessionQuery");

const { generateError } = require("../../helpers");

const newSession = async (req, res, next) => {
  try {
    const { idSection, title, date, hour, place, duration, bio, cur_text } =
      req.body;

    if (
      !idSection ||
      !title ||
      !date ||
      !hour ||
      !place ||
      !duration ||
      !bio ||
      !cur_text
    ) {
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
    const idSession = await insertSessionQuery(
      idSection,
      title,
      date,
      hour,
      place,
      duration,
      bio,
      cur_text
    );

    res.send({
      status: "ok",
      data: {
        Sesión: {
          id: idSession,
          idSection,
          title,
          date,
          hour,
          place,
          duration,
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

module.exports = newSession;
