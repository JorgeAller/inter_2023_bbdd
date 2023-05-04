const selectSectionByIdQuery = require("../../bbdd/queries/01_sections/selectSectionByIdQuery");

const getSection = async (req, res, next) => {
  try {
    const { idSection } = req.params;
    const section = await selectSectionByIdQuery(idSection);
    console.log("controller", section);
    res.send({
      status: "ok",
      message: `Sección id: ${idSection}`,
      data: {
        section,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSection;
