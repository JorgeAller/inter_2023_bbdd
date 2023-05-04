const selectAllSessionsQuery = require("../../bbdd/queries/02_sessions/selectAllSessionsQuery");

const listSessions = async (req, res, next) => {
  try {
    const sessions = await selectAllSessionsQuery();

    res.send({
      status: "ok",
      message: "Aquí tienes las sesiones:",
      data: { sessions },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listSessions;
