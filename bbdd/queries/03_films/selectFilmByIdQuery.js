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
      F.idSession,
      F.title, 
      F.short_desc, 
      F.image, 
      B.director, 
      B.year, 
      B.duration, 
      B.sponsor, 
      B.country, 
      B.country_en, 
      B.country_gl, 
      G.bio, 
      G.bio_en, 
      G.bio_gl, 
      G.credits, 
      G.genre, 
      G.genre_en, 
      G.genre_gl, 
      G.title_translated, 
      G.title_translated_en, 
      G.title_translated_gl, 
      G.lang, 
      G.lang_en, 
      G.lang_gl, 
      G.subt_lang, 
      G.subt_lang_en, 
      G.subt_lang_gl, 
      G.film_type, 
      G.film_type_en, 
      G.film_type_gl, 
      G.premiere_type,
      G.premiere_type_en,
      G.premiere_type_gl,
      T.sound_format, 
      T.sound_format_en, 
      T.sound_format, 
      T.color_bn, 
      T.color_bn_en, 
      T.color_bn_gl, 
      T.recording_format, 
      T.recording_format_en, 
      T.recording_format_gl, 
      T.exhibition_format, 
      T.exhibition_format_en, 
      T.exhibition_format_gl, 
      T.film_dimmension,
      T.film_dimmension_en,
      T.film_dimmension_gl,
      TM.writer, 
      TM.dir_photo, 
      TM.editor, 
      TM.sound, 
      TM.exec_prod, 
      TM.other, 
      TM.prod, 
      TM.prod_company, 
      TM.distr_company, 
      TM.participants,
      FM.name AS imageName
      FROM 
      films F 
      LEFT JOIN basic_info B ON F.basic_info_id = B.id 
      LEFT JOIN general_info G ON F.general_info_id = G.id 
      LEFT JOIN technical_info T ON F.technical_info_id = T.id 
      LEFT JOIN team TM ON F.team_id = TM.id 
      LEFT JOIN filmsMedia FM ON F.id = FM.idFilm
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
