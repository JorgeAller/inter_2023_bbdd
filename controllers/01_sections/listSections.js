const selectAllSectionsQuery = require("../../bbdd/queries/01_sections/selectAllSectionsQuery");

const listSections = async (req, res, next) => {
  try {
    const sections = await selectAllSectionsQuery();

    res.send({
      status: "ok",
      message: "Aquí tienes las secciones:",
      data: { sections },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listSections;
