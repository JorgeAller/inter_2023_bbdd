const selectAllSectionsQuery = require("../../bbdd/queries/01_sections/selectAllSectionsQuery");
const selectSessionsByIdSectionQuery = require("../../bbdd/queries/02_sessions/selectSessionsByIdSectionQuery");

const listSections = async (req, res, next) => {
  try {
    const sections = await selectAllSectionsQuery();

    res.send({
      status: "ok",
      message: "Aquí tienes las secciones con sus sesiones:",
      data: { sections },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listSections;
