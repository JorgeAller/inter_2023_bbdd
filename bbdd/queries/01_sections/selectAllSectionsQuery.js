const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectAllSectionsWithSessionsAndFilmsQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [sections] = await connection.query(`
      SELECT
        S.*,
        M.name
      FROM
        sections S
        LEFT JOIN sectionsMedia M ON S.id = M.idSection

    `);

    const [sessions] = await connection.query(`
      SELECT 
        S.*,
        M.name
      FROM
        sessions S
      LEFT JOIN sessionsMedia M ON S.id = M.idSession
    `);

    console.log(sessions);

    const [films] = await connection.query(`
      SELECT 
        F.id, 
        F.idSession, 
        F.title, 
        F.short_desc, 
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
        M.name
      FROM films F 
      LEFT JOIN basic_info B ON F.basic_info_id = B.id
      LEFT JOIN general_info G ON F.general_info_id = G.id
      LEFT JOIN technical_info T ON F.technical_info_id = T.id
      LEFT JOIN team TM ON F.team_id = TM.id
      LEFT JOIN filmsMedia M ON F.id = M.idFilm

    `);

    // Procesar las secciones y agregar sesiones y películas anidadas
    const nestedData = {
      sections: [],
    };

    sections.forEach((section) => {
      const nestedSection = {
        id: section.id,
        type: section.type,
        title: section.title,
        short_desc: section.short_desc,
        bio: section.bio,
        cur_text: section.cur_text,
        image: section.name,
        createdAt: section.createdAt,
        sessions: sessions
          .filter((session) => session.idSection === section.id) // Filtrar sesiones por idSection
          .map((session) => {
            return {
              id: session.id,
              bio: session.bio,
              date: session.date,
              hour: session.hour,
              image: session.name,
              place: session.place,
              title: session.title,
              weekDay: session.weekDay,
              weekDay_en: session.weekDay_en,
              weekDay_gl: session.weekDay_gl,
              cur_text: session.cur_text,
              duration: session.duration,
              createdAt: session.createdAt,
              films: films
                .filter((film) => film.idSession === session.id)
                .map((film) => {
                  return {
                    id: film.id,
                    title: film.title,
                    director: film.director,
                    year: film.year,
                    duration: film.duration,
                    image: film.name
                  };
                }), // Filtrar películas por idSession
            };
          }),
      };
      nestedData.sections.push(nestedSection);
    });

    return nestedData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllSectionsWithSessionsAndFilmsQuery;
