const selectSessionByIdQuery = require("../../bbdd/queries/02_sessions/selectSessionByIdQuery");

const getSession = async (req, res, next) => {
  try {
    const { idSession } = req.params;
    const session = await selectSessionByIdQuery(idSession);
    console.log("controller", session);
    res.send({
      status: "ok",
      message: `Sesión id: ${idSession}`,
      data: {
        session,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSession;
