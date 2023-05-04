const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");
const selectFilmByIdQuery = async (idFilm) => {
  let connection;
  try {
    connection = await getConnection();

    const [films] = await connection.query(
      `
      SELECT 
      F.id, 
      B.id AS basic_info_id,
      G.id AS general_info_id,
      T.id AS technical_info_id,
      TM.id AS team_id,
      F.title, 
      F.short_desc, 
      F.image, B.director, 
      B.year, 
      B.duration, 
      B.sponsor, 
      B.country, 
      G.bio, 
      G.credits, 
      G.genre, 
      G.title_original, 
      G.translated_title, 
      G.lang, 
      G.subt_lang, 
      G.film_type, 
      G.premiere_type,
      T.sound_format, 
      T.color_bn, 
      T.recording_format, 
      T.exhibition_format, 
      T.film_dimmension,
      TM.writer, 
      TM.dir_photo, 
      TM.editor, 
      TM.sound, 
      TM.exec_prod, 
      TM.other, 
      TM.prod, 
      TM.prod_company, 
      TM.distr_company, 
      TM.participants
     
      FROM 
      films F 
      LEFT JOIN basic_info B ON F.basic_info_id = B.id 
      LEFT JOIN general_info G ON F.general_info_id = G.id 
      LEFT JOIN technical_info T ON F.technical_info_id = T.id 
      LEFT JOIN team TM ON F.team_id = TM.id 
      WHERE 
      F.id = ?
      
      `,
      [idFilm]
    );

    if (films < 1) {
      throw generateError(
        "No se ha encontrado ninguna película con ese id!",
        404
      );
    }
    return films;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFilmByIdQuery;
