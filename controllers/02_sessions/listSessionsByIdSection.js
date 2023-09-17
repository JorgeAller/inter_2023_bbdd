const selectSessionsByIdSectionQuery = require("../../bbdd/queries/02_sessions/selectSessionsByIdSectionQuery");

const getSession = async (req, res, next) => {
  try {
    const { idSection } = req.params;
    const sessions = await selectSessionsByIdSectionQuery(idSection);
    console.log("controller", sessions);
    res.send({
      status: "ok",
      message: `Sesiones de la seccion id: ${idSection}`,
      data: {
        sessions,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSession;